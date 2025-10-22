package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.dto.ReviewDTO;
import rs.ac.ftn.svt.events.model.entity.Location;
import rs.ac.ftn.svt.events.model.entity.Review;
import rs.ac.ftn.svt.events.repository.LocationRepository;
import rs.ac.ftn.svt.events.repository.ReviewRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
class ReviewService implements rs.ac.ftn.svt.events.service.ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    @Override
    public Review findOne(Long id) {
        return reviewRepository.findFirstById(id);
    }

    @Override
    public Review createReview(ReviewDTO reviewDTO) {
        Optional<Review> review = reviewRepository.findById((reviewDTO.getId()));

        if (review.isPresent()) {
            return null;
        }
        Review newReview = new Review();

        newReview.setCreatedAt(LocalDateTime.now());
        newReview.setRate(reviewDTO.getRate());
        newReview.setEvent(reviewDTO.getEvent());
        newReview.setHidden(false);


        double numberOfRatings = 4;
        double totalRating = reviewDTO.getRate().getPerformance() + reviewDTO.getRate().getSoundAndLightning() +
                reviewDTO.getRate().getVenue() + reviewDTO.getRate().getOverallImpression();

        for (Review review1 : reviewRepository.findAll()) {
            if (review1.getEvent().getLocation().equals(newReview.getEvent().getLocation())) {
                numberOfRatings += 4;
                totalRating += review1.getRate().getPerformance() + review1.getRate().getSoundAndLightning() +
                        review1.getRate().getVenue() + review1.getRate().getOverallImpression();
            }
            Location reviewLocation = newReview.getEvent().getLocation();
            reviewLocation.setTotalRating(totalRating / numberOfRatings);
            locationRepository.save(reviewLocation);

            reviewRepository.save(newReview);
        }
        return newReview;
    }


    @Override
    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public void hide(Long id) {
        Review forHiding = reviewRepository.findFirstById(id);
        forHiding.setHidden(true);
        reviewRepository.save(forHiding);
    }
}
