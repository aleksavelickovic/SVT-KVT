package rs.ac.ftn.svt.events.service;

import rs.ac.ftn.svt.events.model.dto.UserDTO;
import rs.ac.ftn.svt.events.model.entity.Administrator;
import rs.ac.ftn.svt.events.model.entity.User;

import java.util.List;

public interface UserService {

    User findByEmail(String email);

    User createUser(UserDTO userDTO);

    User createUser(User user);

    List<User> findAll();

    List<User> findAllUsers();

    List<Administrator> findAllAdmins();
}
