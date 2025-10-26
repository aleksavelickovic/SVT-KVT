package rs.ac.ftn.svt.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import rs.ac.ftn.svt.events.model.entity.Administrator;
import rs.ac.ftn.svt.events.model.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findFirstByEmail(String email);

    @Query(value = "select * from users where dtype = 'ROLE_USER'", nativeQuery = true)
    List<User> findAllUsers();

    @Query(value = "select * from users where dtype = 'ROLE_ADMINISTRATOR'", nativeQuery = true)
    List<Administrator> findAllAdmins();


    User findFirstById(Long id);
}
