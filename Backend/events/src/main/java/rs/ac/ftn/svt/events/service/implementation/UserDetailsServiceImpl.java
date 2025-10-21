package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.entity.Administrator;
import rs.ac.ftn.svt.events.model.entity.User;
import rs.ac.ftn.svt.events.service.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
//Primary je neophodno da bi naglasili Spring Boot-u da zelimo bas ovaj UserDetailService kada budemo koristili
//Autowired pri konfiguraciji security-a
@Primary
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    /*
    @Autowired
    public UserDetailsServiceImpl(UserService userService){
        this.userService = userService;
    }
*/

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userService.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("There is no user with email " + email);
        } else {
            List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
            String role = "";

            for (User u : userService.findAllUsers()) {
                if (user.getEmail().equals(u.getEmail())) {
                    role = "ROLE_USER";
                    break;
                }
            }

            for (Administrator a : userService.findAllAdmins()) {
                if (user.getEmail().equals(a.getEmail())) {
                    role = "ROLE_ADMINISTRATOR";
                    break;
                }
            }

//            if (user instanceof User) {
//                role = "ROLE_USER";
//            } else if (user instanceof Administrator) {
//                role = "ROLE_ADMIN"; // TODO vrati se ovde kad dodas administratora u model
//            }

            grantedAuthorities.add(new SimpleGrantedAuthority(role));

            return new org.springframework.security.core.userdetails.User(
                    user.getEmail().trim(),
                    user.getPassword().trim(),
                    grantedAuthorities);
        }
    }
}
