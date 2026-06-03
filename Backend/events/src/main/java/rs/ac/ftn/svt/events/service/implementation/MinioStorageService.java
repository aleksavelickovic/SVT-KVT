package rs.ac.ftn.svt.events.service.implementation;

import io.minio.BucketExistsArgs;
import io.minio.GetObjectArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.StatObjectArgs;
import io.minio.StatObjectResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@Service
public class MinioStorageService {

    public static class StoredObjectData {
        private final InputStreamResource resource;
        private final String contentType;
        private final long size;

        public StoredObjectData(InputStreamResource resource, String contentType, long size) {
            this.resource = resource;
            this.contentType = contentType;
            this.size = size;
        }

        public InputStreamResource getResource() {
            return resource;
        }

        public String getContentType() {
            return contentType;
        }

        public long getSize() {
            return size;
        }
    }

    private final MinioClient minioClient;

    @Value("${app.minio.bucket.images}")
    private String imageBucket;

    @Value("${app.minio.bucket.documents}")
    private String documentBucket;

    public MinioStorageService(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public void initializeBuckets() throws Exception {
        ensureBucket(imageBucket);
        ensureBucket(documentBucket);
        seedFolder(imageBucket, Paths.get("uploads"));
    }

    public String store(String bucket, MultipartFile file) throws Exception {
        ensureBucket(bucket);
        String objectName = Objects.requireNonNull(file.getOriginalFilename());
        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucket)
                        .object(objectName)
                        .stream(file.getInputStream(), file.getSize(), -1)
                        .contentType(file.getContentType())
                        .build()
        );
        return objectName;
    }

    public StoredObjectData read(String bucket, String objectName) throws Exception {
        StatObjectResponse stat = minioClient.statObject(
                StatObjectArgs.builder()
                        .bucket(bucket)
                        .object(objectName)
                        .build()
        );
        InputStream stream = minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(bucket)
                        .object(objectName)
                        .build()
        );
        return new StoredObjectData(
                new InputStreamResource(stream),
                stat.contentType() != null ? stat.contentType() : MediaType.APPLICATION_OCTET_STREAM_VALUE,
                stat.size()
        );
    }

    public void ensureBucket(String bucket) throws Exception {
        boolean exists = minioClient.bucketExists(
                BucketExistsArgs.builder()
                        .bucket(bucket)
                        .build()
        );
        if (!exists) {
            minioClient.makeBucket(
                    MakeBucketArgs.builder()
                            .bucket(bucket)
                            .build()
            );
        }
    }

    public boolean objectExists(String bucket, String objectName) {
        try {
            minioClient.statObject(
                    StatObjectArgs.builder()
                            .bucket(bucket)
                            .object(objectName)
                            .build()
            );
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private void seedFolder(String bucket, Path folder) throws Exception {
        if (!Files.exists(folder) || !Files.isDirectory(folder)) {
            return;
        }

        try (var paths = Files.list(folder)) {
            paths.filter(Files::isRegularFile)
                    .forEach(path -> {
                        String objectName = path.getFileName().toString();
                        if (objectExists(bucket, objectName)) {
                            return;
                        }
                        try (InputStream inputStream = Files.newInputStream(path)) {
                            String contentType = Files.probeContentType(path);
                            minioClient.putObject(
                                    PutObjectArgs.builder()
                                            .bucket(bucket)
                                            .object(objectName)
                                            .stream(inputStream, Files.size(path), -1)
                                            .contentType(contentType != null ? contentType : MediaType.APPLICATION_OCTET_STREAM_VALUE)
                                            .build()
                            );
                        } catch (Exception ignored) {
                        }
                    });
        }
    }
}
