package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.ac.ftn.svt.events.model.dto.ReviewDTO;
import rs.ac.ftn.svt.events.model.entity.Review;
import rs.ac.ftn.svt.events.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @CrossOrigin
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMINISTRATOR')")
    public ResponseEntity<Review> addReview(@RequestBody ReviewDTO reviewDTO) {
        System.out.println("REVIEW!!!");
        return ResponseEntity.ok(reviewService.createReview(reviewDTO));
    }

    @CrossOrigin
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMINISTRATOR')")
    public ResponseEntity<List<Review>> findAll() {
        return ResponseEntity.ok(reviewService.findAll());
    }


}
