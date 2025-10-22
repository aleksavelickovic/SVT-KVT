package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rs.ac.ftn.svt.events.model.dto.ReviewDTO;
import rs.ac.ftn.svt.events.model.entity.Review;
import rs.ac.ftn.svt.events.service.ReviewService;

@RestController
@RequestMapping("/reviews")
class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Review> addReview(@RequestBody ReviewDTO reviewDTO) {
        return ResponseEntity.ok(reviewService.createReview(reviewDTO));
    }

}
