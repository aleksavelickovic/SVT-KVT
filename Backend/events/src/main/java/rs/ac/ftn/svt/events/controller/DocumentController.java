package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import rs.ac.ftn.svt.events.service.implementation.MinioStorageService;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    private final MinioStorageService storageService;

    @Value("${app.minio.bucket.documents}")
    private String bucketName;

    public DocumentController(MinioStorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/{filename}")
    public ResponseEntity<InputStreamResource> getDocument(@PathVariable String filename) {
        try {
            MinioStorageService.StoredObjectData storedObjectData = storageService.read(bucketName, filename);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .contentLength(storedObjectData.getSize())
                    .body(storedObjectData.getResource());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file) {
        try {
            String filename = storageService.store(bucketName, file);
            return ResponseEntity.ok(filename);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Neuspesan upload dokumenta");
        }
    }
}
