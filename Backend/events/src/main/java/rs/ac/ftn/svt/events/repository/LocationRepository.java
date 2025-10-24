package rs.ac.ftn.svt.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rs.ac.ftn.svt.events.model.entity.Location;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findFirstById(Long id);

    Optional<Location> findFirstByName(String name);

    @Query(value = "select * from locations l where l.id = (select manages_id from users_manages where managed_by_id = :userId)", nativeQuery = true)
    List<Location> findAllManagedLocations(@Param("userId") Long userId);
}
