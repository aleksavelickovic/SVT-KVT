package rs.ac.ftn.svt.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;
import rs.ac.ftn.svt.events.model.entity.Rate;

@org.springframework.stereotype.Repository
public interface RateRepository extends JpaRepository<Rate, Long> {

}
