package rs.ac.ftn.svt.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.ftn.svt.events.model.entity.Administrator;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
}
