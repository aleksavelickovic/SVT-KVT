package rs.ac.ftn.svt.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.ftn.svt.events.model.entity.Event;

import javax.validation.constraints.NotBlank;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    Event findFirstById(Long id);

    Optional<Event> findFirstByName(@NotBlank String name);
}
