package rs.ac.ftn.svt.events.service;

import rs.ac.ftn.svt.events.model.dto.ReviewDTO;
import rs.ac.ftn.svt.events.model.entity.Review;

import java.util.List;

public interface ReviewService {
    List<Review> findAll();

    Review findOne(Long id);

    Review createReview(ReviewDTO reviewDTO);

    Review save(Review review);

    void hide(Long id);
}
