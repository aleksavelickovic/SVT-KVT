package rs.ac.ftn.svt.events.service.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.elasticsearch.action.admin.indices.create.CreateIndexRequest;
import org.elasticsearch.action.admin.indices.get.GetIndexRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.action.support.WriteRequest;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MoreLikeThisQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import org.elasticsearch.search.sort.FieldSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.elasticsearch.xcontent.XContentType;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import rs.ac.ftn.svt.events.model.dto.LocationSearchRequest;
import rs.ac.ftn.svt.events.model.dto.LocationSearchResultDTO;
import rs.ac.ftn.svt.events.model.entity.Location;
import rs.ac.ftn.svt.events.model.entity.LocationSearchDocument;
import rs.ac.ftn.svt.events.model.entity.Review;
import rs.ac.ftn.svt.events.model.entity.Rate;
import rs.ac.ftn.svt.events.repository.LocationRepository;
import rs.ac.ftn.svt.events.repository.ReviewRepository;
import rs.ac.ftn.svt.events.service.LocationSearchService;

import java.io.InputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class LocationSearchServiceImpl implements LocationSearchService {

    private static final String NAME_FIELD = "name";
    private static final String DESCRIPTION_FIELD = "description";
    private static final String PDF_TEXT_FIELD = "pdfText";
    private static final String NAME_PREFIX_FIELD = "namePrefix";
    private static final String DESCRIPTION_PREFIX_FIELD = "descriptionPrefix";
    private static final String PDF_PREFIX_FIELD = "pdfTextPrefix";
    private static final String NAME_SORT_FIELD = "nameSort";
    private static final String[] CYRILLIC_MAPPINGS = {
            "А => A", "Б => B", "В => V", "Г => G", "Д => D",
            "Ђ => Dj", "Е => E", "Ж => Z", "З => Z", "И => I",
            "Ј => J", "К => K", "Л => L", "Љ => Lj", "М => M",
            "Н => N", "Њ => Nj", "О => O", "П => P", "Р => R",
            "С => S", "Т => T", "Ћ => C", "У => U", "Ф => F",
            "Х => H", "Ц => C", "Ч => C", "Џ => Dz", "Ш => S",
            "а => a", "б => b", "в => v", "г => g", "д => d",
            "ђ => dj", "е => e", "ж => z", "з => z", "и => i",
            "ј => j", "к => k", "л => l", "љ => lj", "м => m",
            "н => n", "њ => nj", "о => o", "п => p", "р => r",
            "с => s", "т => t", "ћ => c", "у => u", "ф => f",
            "х => h", "ц => c", "ч => c", "џ => dz", "ш => s"
    };

    private final RestHighLevelClient client;
    private final LocationRepository locationRepository;
    private final ReviewRepository reviewRepository;
    private final MinioStorageService storageService;
    private final ObjectMapper objectMapper;

    @Value("${app.elasticsearch.index-name}")
    private String indexName;

    @Value("${app.minio.bucket.documents}")
    private String documentBucket;

    public LocationSearchServiceImpl(RestHighLevelClient client,
                                     LocationRepository locationRepository,
                                     ReviewRepository reviewRepository,
                                     MinioStorageService storageService,
                                     ObjectMapper objectMapper) {
        this.client = client;
        this.locationRepository = locationRepository;
        this.reviewRepository = reviewRepository;
        this.storageService = storageService;
        this.objectMapper = objectMapper;
    }

    @Order(1)
    @EventListener(ApplicationReadyEvent.class)
    public void initializeIndex() {
        Exception lastError = null;
        for (int attempt = 1; attempt <= 10; attempt++) {
            try {
                storageService.initializeBuckets();
                if (ensureIndex()) {
                    reindexAllLocations();
                }
                return;
            } catch (Exception e) {
                lastError = e;
                try {
                    Thread.sleep(2000L);
                } catch (InterruptedException interruptedException) {
                    Thread.currentThread().interrupt();
                    throw new IllegalStateException("Interrupted while initializing Elasticsearch index", interruptedException);
                }
            }
        }
        throw new IllegalStateException("Unable to initialize Elasticsearch index", lastError);
    }

    @Override
    public void indexLocation(Long locationId) {
        try {
            Location location = locationRepository.findFirstById(locationId);
            if (location == null) {
                return;
            }

            LocationSearchDocument document = buildDocument(location);
            IndexRequest request = new IndexRequest(indexName)
                    .id(String.valueOf(location.getId()))
                    .source(objectMapper.convertValue(document, Map.class));
            request.setRefreshPolicy(WriteRequest.RefreshPolicy.IMMEDIATE);
            client.index(request, RequestOptions.DEFAULT);
        } catch (Exception e) {
            throw new IllegalStateException("Unable to index location " + locationId, e);
        }
    }

    @Override
    public void deleteLocation(Long locationId) {
        try {
            client.delete(new org.elasticsearch.action.delete.DeleteRequest(indexName, String.valueOf(locationId)),
                    RequestOptions.DEFAULT);
        } catch (Exception ignored) {
        }
    }

    @Override
    public List<LocationSearchResultDTO> search(LocationSearchRequest request) {
        try {
            SearchRequest searchRequest = new SearchRequest(indexName);
            SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
            BoolQueryBuilder root = QueryBuilders.boolQuery();

            String operator = request.getOperator() != null ? request.getOperator().trim().toUpperCase(Locale.ROOT) : "AND";
            boolean useShould = "OR".equals(operator);

            addTextClause(root, request.getName(), NAME_FIELD, NAME_PREFIX_FIELD, useShould);
            addTextClause(root, request.getDescription(), DESCRIPTION_FIELD, DESCRIPTION_PREFIX_FIELD, useShould);
            addTextClause(root, request.getPdfText(), PDF_TEXT_FIELD, PDF_PREFIX_FIELD, useShould);

            addRangeClause(root, "reviewCount", request.getReviewCountFrom(), request.getReviewCountTo(), useShould);
            addRangeClause(root, "performanceAverage", request.getPerformanceFrom(), request.getPerformanceTo(), useShould);
            addRangeClause(root, "soundAverage", request.getSoundFrom(), request.getSoundTo(), useShould);
            addRangeClause(root, "lightingAverage", request.getLightingFrom(), request.getLightingTo(), useShould);
            addRangeClause(root, "venueAverage", request.getVenueFrom(), request.getVenueTo(), useShould);
            addRangeClause(root, "overallImpressionAverage", request.getOverallImpressionFrom(), request.getOverallImpressionTo(), useShould);

            if (root.must().isEmpty() && root.should().isEmpty()) {
                sourceBuilder.query(QueryBuilders.matchAllQuery());
            } else {
                if (useShould) {
                    root.minimumShouldMatch(1);
                }
                sourceBuilder.query(root);
            }

            HighlightBuilder highlightBuilder = new HighlightBuilder()
                    .field(new HighlightBuilder.Field(NAME_FIELD))
                    .field(new HighlightBuilder.Field(DESCRIPTION_FIELD))
                    .field(new HighlightBuilder.Field(PDF_TEXT_FIELD))
                    .preTags("<mark>")
                    .postTags("</mark>");
            sourceBuilder.highlighter(highlightBuilder);

            SortOrder sortOrder = "DESC".equalsIgnoreCase(request.getSortDirection()) ? SortOrder.DESC : SortOrder.ASC;
            sourceBuilder.sort(new FieldSortBuilder(NAME_SORT_FIELD).order(sortOrder));
            sourceBuilder.size(200);

            searchRequest.source(sourceBuilder);
            SearchResponse response = client.search(searchRequest, RequestOptions.DEFAULT);
            return Arrays.stream(response.getHits().getHits())
                    .map(this::toResult)
                    .toList();
        } catch (Exception e) {
            throw new IllegalStateException("Unable to search locations", e);
        }
    }

    @Override
    public List<LocationSearchResultDTO> moreLikeThis(Long locationId) {
        try {
            Location location = locationRepository.findFirstById(locationId);
            if (location == null) {
                return List.of();
            }

            String likeText = Arrays.asList(
                            location.getName(),
                            location.getDescription(),
                            extractPdfText(location.getDocumentFilename()))
                    .stream()
                    .filter(Objects::nonNull)
                    .filter(text -> !text.isBlank())
                    .collect(Collectors.joining(" "));

            if (likeText.isBlank()) {
                return List.of();
            }

            QueryBuilder queryBuilder = QueryBuilders.moreLikeThisQuery(
                            new String[]{NAME_FIELD, DESCRIPTION_FIELD, PDF_TEXT_FIELD},
                            new String[]{likeText},
                            null)
                    .minTermFreq(1)
                    .minDocFreq(1)
                    .maxQueryTerms(25)
                    .minWordLength(2)
                    .include(false);

            BoolQueryBuilder boolQuery = QueryBuilders.boolQuery()
                    .must(queryBuilder)
                    .mustNot(QueryBuilders.termQuery("id", locationId));

            SearchSourceBuilder sourceBuilder = new SearchSourceBuilder()
                    .query(boolQuery)
                    .size(10)
                    .sort(new FieldSortBuilder(NAME_SORT_FIELD).order(SortOrder.ASC));

            HighlightBuilder highlightBuilder = new HighlightBuilder()
                    .field(new HighlightBuilder.Field(NAME_FIELD))
                    .field(new HighlightBuilder.Field(DESCRIPTION_FIELD))
                    .field(new HighlightBuilder.Field(PDF_TEXT_FIELD))
                    .preTags("<mark>")
                    .postTags("</mark>");
            sourceBuilder.highlighter(highlightBuilder);

            SearchRequest searchRequest = new SearchRequest(indexName).source(sourceBuilder);
            SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
            List<LocationSearchResultDTO> results = Arrays.stream(searchResponse.getHits().getHits())
                    .map(this::toResult)
                    .toList();

            if (!results.isEmpty()) {
                return results;
            }

            return fallbackMoreLikeThis(locationId, location);
        } catch (Exception e) {
            throw new IllegalStateException("Unable to execute more-like-this search", e);
        }
    }

    private List<LocationSearchResultDTO> fallbackMoreLikeThis(Long locationId, Location location) throws Exception {
        BoolQueryBuilder fallbackQuery = QueryBuilders.boolQuery()
                .should(QueryBuilders.matchQuery(NAME_FIELD, location.getName()).boost(3.0f))
                .should(QueryBuilders.matchQuery(DESCRIPTION_FIELD, location.getDescription()).boost(2.0f))
                .should(QueryBuilders.matchQuery(PDF_TEXT_FIELD, extractPdfText(location.getDocumentFilename())).boost(4.0f))
                .minimumShouldMatch(1)
                .mustNot(QueryBuilders.termQuery("id", locationId));

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder()
                .query(fallbackQuery)
                .size(10)
                .sort(new FieldSortBuilder(NAME_SORT_FIELD).order(SortOrder.ASC));

        SearchRequest searchRequest = new SearchRequest(indexName).source(sourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        return Arrays.stream(searchResponse.getHits().getHits())
                .map(this::toResult)
                .toList();
    }

    private boolean ensureIndex() throws Exception {
        GetIndexRequest getIndexRequest = new GetIndexRequest();
        getIndexRequest.indices(indexName);
        if (client.indices().exists(getIndexRequest, RequestOptions.DEFAULT)) {
            return false;
        }

        CreateIndexRequest request = new CreateIndexRequest(indexName);
        Map<String, Object> settings = new HashMap<>();
        settings.put("index", Map.of("number_of_shards", 1, "number_of_replicas", 0));
        settings.put("analysis", Map.of(
                "analyzer", Map.of(
                        "serbian_text", Map.of(
                                "type", "custom",
                                "tokenizer", "standard",
                                "char_filter", List.of("serbian_cyrillic_to_latin"),
                                "filter", List.of("lowercase", "asciifolding")
                        )
                ),
                "char_filter", Map.of(
                        "serbian_cyrillic_to_latin", Map.of(
                                "type", "mapping",
                                "mappings", CYRILLIC_MAPPINGS
                        )
                )
        ));

        Map<String, Object> properties = new HashMap<>();
        properties.put("id", Map.of("type", "long"));
        properties.put("name", Map.of("type", "text", "analyzer", "serbian_text"));
        properties.put("nameSort", Map.of("type", "keyword"));
        properties.put("namePrefix", Map.of("type", "keyword"));
        properties.put("description", Map.of("type", "text", "analyzer", "serbian_text"));
        properties.put("descriptionPrefix", Map.of("type", "keyword"));
        properties.put("pdfText", Map.of("type", "text", "analyzer", "serbian_text"));
        properties.put("pdfTextPrefix", Map.of("type", "keyword"));
        properties.put("reviewCount", Map.of("type", "integer"));
        properties.put("performanceAverage", Map.of("type", "double"));
        properties.put("soundAverage", Map.of("type", "double"));
        properties.put("lightingAverage", Map.of("type", "double"));
        properties.put("venueAverage", Map.of("type", "double"));
        properties.put("overallImpressionAverage", Map.of("type", "double"));
        properties.put("totalRating", Map.of("type", "double"));
        properties.put("imageFilename", Map.of("type", "keyword"));
        properties.put("documentFilename", Map.of("type", "keyword"));
        properties.put("address", Map.of("type", "keyword"));
        properties.put("type", Map.of("type", "keyword"));
        properties.put("createdAt", Map.of("type", "keyword"));

        request.settings(settings);
        Map<String, Object> mappings = new HashMap<>();
        mappings.put("properties", properties);
        Map<String, Object> body = new HashMap<>();
        body.put("mappings", Map.of("_doc", mappings));
        request.source(objectMapper.writeValueAsString(body), XContentType.JSON);
        client.indices().create(request, RequestOptions.DEFAULT);
        return true;
    }

    private void reindexAllLocations() {
        for (Location location : locationRepository.findAll()) {
            indexLocation(location.getId());
        }
    }

    private LocationSearchDocument buildDocument(Location location) throws Exception {
        LocationMetrics metrics = calculateMetrics(location);
        String pdfText = extractPdfText(location.getDocumentFilename());

        return new LocationSearchDocument(
                location.getId(),
                location.getName(),
                normalizeForKeyword(location.getName()),
                normalizeForKeyword(location.getName()),
                location.getDescription(),
                normalizeForKeyword(location.getDescription()),
                pdfText,
                normalizeForKeyword(pdfText),
                metrics.reviewCount,
                metrics.performanceAverage,
                metrics.soundAverage,
                metrics.lightingAverage,
                metrics.venueAverage,
                metrics.overallImpressionAverage,
                location.getTotalRating(),
                location.getImageFilename(),
                location.getDocumentFilename(),
                location.getAddress(),
                location.getType(),
                location.getCreatedAt() != null ? location.getCreatedAt().toString() : null
        );
    }

    private LocationMetrics calculateMetrics(Location location) {
        List<Review> reviews = reviewRepository.findAll().stream()
                .filter(review -> review.getEvent() != null)
                .filter(review -> review.getEvent().getLocation() != null)
                .filter(review -> review.getEvent().getLocation().getId().equals(location.getId()))
                .toList();

        if (reviews.isEmpty()) {
            return new LocationMetrics(0, 0.0, 0.0, 0.0, 0.0, 0.0);
        }

        double performanceSum = 0;
        double soundSum = 0;
        double lightingSum = 0;
        double venueSum = 0;
        double overallSum = 0;
        for (Review review : reviews) {
            Rate rate = review.getRate();
            performanceSum += rate.getPerformance();
            soundSum += rate.getSound();
            lightingSum += rate.getLighting();
            venueSum += rate.getVenue();
            overallSum += rate.getOverallImpression();
        }

        int reviewCount = reviews.size();
        return new LocationMetrics(
                reviewCount,
                performanceSum / reviewCount,
                soundSum / reviewCount,
                lightingSum / reviewCount,
                venueSum / reviewCount,
                overallSum / reviewCount
        );
    }

    private String extractPdfText(String documentFilename) {
        if (documentFilename == null || documentFilename.isBlank()) {
            return "";
        }

        try {
            MinioStorageService.StoredObjectData objectData = storageService.read(documentBucket, documentFilename);
            try (InputStream inputStream = objectData.getResource().getInputStream();
                 PDDocument pdfDocument = PDDocument.load(inputStream)) {
                PDFTextStripper textStripper = new PDFTextStripper();
                return textStripper.getText(pdfDocument);
            }
        } catch (Exception e) {
            return "";
        }
    }

    private LocationSearchResultDTO toResult(SearchHit searchHit) {
        LocationSearchDocument document = objectMapper.convertValue(searchHit.getSourceAsMap(), LocationSearchDocument.class);
        return new LocationSearchResultDTO(
                document.getId(),
                document.getName(),
                document.getDescription(),
                document.getCreatedAt() != null ? LocalDate.parse(document.getCreatedAt()) : null,
                document.getAddress(),
                document.getType(),
                document.getTotalRating(),
                document.getImageFilename(),
                document.getDocumentFilename(),
                document.getReviewCount(),
                document.getPerformanceAverage(),
                document.getSoundAverage(),
                document.getLightingAverage(),
                document.getVenueAverage(),
                document.getOverallImpressionAverage(),
                collectHighlight(searchHit)
        );
    }

    private String collectHighlight(SearchHit searchHit) {
        List<String> snippets = new ArrayList<>();
        for (String field : List.of(NAME_FIELD, DESCRIPTION_FIELD, PDF_TEXT_FIELD)) {
            HighlightField highlightField = searchHit.getHighlightFields().get(field);
            if (highlightField == null) {
                continue;
            }
            for (Text fragment : highlightField.fragments()) {
                snippets.add(fragment.string());
            }
        }
        return String.join(" ", snippets);
    }

    private void addTextClause(BoolQueryBuilder root, String value, String field, String prefixField, boolean useShould) {
        if (value == null || value.trim().isEmpty()) {
            return;
        }

        QueryBuilder clause = buildTextQuery(value.trim(), field, prefixField);
        addClause(root, clause, useShould);
    }

    private void addRangeClause(BoolQueryBuilder root, String field, Number from, Number to, boolean useShould) {
        if (from == null && to == null) {
            return;
        }

        RangeQueryBuilder rangeQuery = QueryBuilders.rangeQuery(field);
        if (from != null) {
            rangeQuery.gte(from);
        }
        if (to != null) {
            rangeQuery.lte(to);
        }
        addClause(root, rangeQuery, useShould);
    }

    private void addClause(BoolQueryBuilder root, QueryBuilder clause, boolean useShould) {
        if (useShould) {
            root.should(clause);
        } else {
            root.must(clause);
        }
    }

    private QueryBuilder buildTextQuery(String rawValue, String field, String prefixField) {
        if (rawValue.startsWith("\"") && rawValue.endsWith("\"") && rawValue.length() > 1) {
            return QueryBuilders.matchPhraseQuery(field, rawValue.substring(1, rawValue.length() - 1));
        }
        if (rawValue.startsWith("~")) {
            String fuzzyValue = rawValue.substring(1).trim();
            return QueryBuilders.fuzzyQuery(field, fuzzyValue).fuzziness(Fuzziness.AUTO);
        }
        if (rawValue.endsWith("*")) {
            String prefix = normalizeForKeyword(rawValue.substring(0, rawValue.length() - 1));
            return QueryBuilders.prefixQuery(prefixField, prefix);
        }
        return QueryBuilders.matchQuery(field, rawValue);
    }

    private String normalizeForKeyword(String value) {
        if (value == null) {
            return null;
        }
        String normalized = value.toLowerCase(Locale.ROOT);
        normalized = normalized
                .replace("а", "a")
                .replace("б", "b")
                .replace("в", "v")
                .replace("г", "g")
                .replace("д", "d")
                .replace("ђ", "dj")
                .replace("е", "e")
                .replace("ж", "z")
                .replace("з", "z")
                .replace("и", "i")
                .replace("ј", "j")
                .replace("к", "k")
                .replace("л", "l")
                .replace("љ", "lj")
                .replace("м", "m")
                .replace("н", "n")
                .replace("њ", "nj")
                .replace("о", "o")
                .replace("п", "p")
                .replace("р", "r")
                .replace("с", "s")
                .replace("т", "t")
                .replace("ћ", "c")
                .replace("у", "u")
                .replace("ф", "f")
                .replace("х", "h")
                .replace("ц", "c")
                .replace("ч", "c")
                .replace("џ", "dz")
                .replace("ш", "s")
                .replace("č", "c")
                .replace("ć", "c")
                .replace("š", "s")
                .replace("ž", "z")
                .replace("đ", "dj");
        return normalized;
    }

    private static class LocationMetrics {
        private final int reviewCount;
        private final double performanceAverage;
        private final double soundAverage;
        private final double lightingAverage;
        private final double venueAverage;
        private final double overallImpressionAverage;

        private LocationMetrics(int reviewCount,
                                double performanceAverage,
                                double soundAverage,
                                double lightingAverage,
                                double venueAverage,
                                double overallImpressionAverage) {
            this.reviewCount = reviewCount;
            this.performanceAverage = performanceAverage;
            this.soundAverage = soundAverage;
            this.lightingAverage = lightingAverage;
            this.venueAverage = venueAverage;
            this.overallImpressionAverage = overallImpressionAverage;
        }
    }
}
