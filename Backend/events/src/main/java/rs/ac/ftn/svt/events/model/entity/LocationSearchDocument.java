package rs.ac.ftn.svt.events.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationSearchDocument {

    private Long id;
    private String name;
    private String nameSort;
    private String namePrefix;

    private String description;
    private String descriptionPrefix;

    private String pdfText;
    private String pdfTextPrefix;

    private Integer reviewCount;

    private Double performanceAverage;
    private Double soundAverage;
    private Double lightingAverage;
    private Double venueAverage;
    private Double overallImpressionAverage;

    private Double totalRating;
    private String imageFilename;
    private String documentFilename;
    private String address;
    private String type;
    private String createdAt;
}
