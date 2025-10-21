package rs.ac.ftn.svt.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.ftn.svt.events.model.entity.AccountRequest;

@Repository
public interface AccountRequestRepository extends JpaRepository<AccountRequest, Long> {
    AccountRequest findFirstById(Long id);
}
