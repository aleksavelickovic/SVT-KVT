package rs.ac.ftn.svt.events.repository;

import org.springframework.data.repository.Repository;
import rs.ac.ftn.svt.events.model.entity.Rate;

@org.springframework.stereotype.Repository
interface RateRepository extends Repository<Rate, Long> {
}
