package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.dto.ReviewDTO;
import rs.ac.ftn.svt.events.model.entity.Location;
import rs.ac.ftn.svt.events.model.entity.Rate;
import rs.ac.ftn.svt.events.model.entity.Review;
import rs.ac.ftn.svt.events.repository.EventRepository;
import rs.ac.ftn.svt.events.repository.LocationRepository;
import rs.ac.ftn.svt.events.repository.RateRepository;
import rs.ac.ftn.svt.events.repository.ReviewRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
class ReviewService implements rs.ac.ftn.svt.events.service.ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private RateRepository rateRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private EventRepository eventRepository;

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

        if (reviewRepository.findById(reviewDTO.getId()).isPresent()) {
            return null;
        }

        Rate rate = new Rate();
        rate.setPerformance(reviewDTO.getRate().getPerformance());
        rate.setSoundAndLightning(reviewDTO.getRate().getSoundAndLightning());
        rate.setVenue(reviewDTO.getRate().getVenue());
        rate.setOverallImpression(reviewDTO.getRate().getOverallImpression());
        rateRepository.save(rate);

        Review newReview = new Review();
        newReview.setCreatedAt(LocalDateTime.now());
        newReview.setRate(rate);
        newReview.setEvent(eventRepository.findFirstById(reviewDTO.getEvent()));
        newReview.setHidden(false);

        reviewRepository.save(newReview);

        Location location = newReview.getEvent().getLocation();
        List<Review> locationReviews = reviewRepository.findAll().stream()
                .filter(r -> r.getEvent().getLocation().equals(location))
                .toList();

        double totalSum = 0;
        int ratingCount = 0;

        for (Review r : locationReviews) {
            Rate rt = r.getRate();
            totalSum += rt.getPerformance() + rt.getSoundAndLightning() +
                    rt.getVenue() + rt.getOverallImpression();
            ratingCount += 4; // 4 criteria
        }

        if (ratingCount > 0) {
            double newAverage = totalSum / ratingCount;
            location.setTotalRating(newAverage);
            locationRepository.save(location);
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
