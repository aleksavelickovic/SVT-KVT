package rs.ac.ftn.svt.events.service;

import rs.ac.ftn.svt.events.model.dto.UserDTO;
import rs.ac.ftn.svt.events.model.entity.User;

import java.util.List;

public interface UserService {

    User findByUsername(String username);

    User createUser(UserDTO userDTO);

    List<User> findAll();
}
