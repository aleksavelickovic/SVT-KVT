package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.dto.UserDTO;
import rs.ac.ftn.svt.events.model.entity.Administrator;
import rs.ac.ftn.svt.events.model.entity.User;
import rs.ac.ftn.svt.events.repository.UserRepository;
import rs.ac.ftn.svt.events.service.UserService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /*
    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }
*/
    @Override
    public User findByEmail(String email) {
        Optional<User> user = userRepository.findFirstByEmail(email);
        if (!user.isEmpty()) {
            return user.get();
        }
        return null;
    }

    @Override
    public User createUser(UserDTO userDTO) {

        Optional<User> user = userRepository.findFirstByEmail(userDTO.getEmail());

        if (user.isPresent()) {
            return null;
        }

        User newUser = new User();
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newUser.setCreatedAt(LocalDate.now());
        newUser.setAddress(userDTO.getAddress());
        newUser.setBirthday(userDTO.getBirthday());
        newUser.setCity(userDTO.getCity());
        newUser.setName(userDTO.getName());
        newUser.setPhoneNumber(userDTO.getPhone_number());

//        newUser.setRole(Roles.USER);
        newUser = userRepository.save(newUser);

        return newUser;
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public List<User> findAllUsers() {
        return this.userRepository.findAllUsers();
    }

    @Override
    public List<Administrator> findAllAdmins() {
        return this.userRepository.findAllAdmins();
    }
}
