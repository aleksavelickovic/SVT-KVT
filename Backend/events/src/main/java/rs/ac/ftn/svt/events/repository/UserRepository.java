package rs.ac.ftn.svt.events.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import rs.ac.ftn.svt.events.model.entity.Administrator;
import rs.ac.ftn.svt.events.model.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findFirstByEmail(String email);

    @Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery = true)
    User findByEmail(@Param("email") String email);

    @Query(value = "select * from users where dtype = 'ROLE_USER'", nativeQuery = true)
    List<User> findAllUsers();

    @Query(value = "select * from users where dtype = 'ROLE_ADMINISTRATOR'", nativeQuery = true)
    List<Administrator> findAllAdmins();

//    @Query(value = "DELETE FROM users_manages WHERE managed_by_id = :managedById AND manages_id = :managesId", nativeQuery = true)


    User findFirstById(Long id);
}
