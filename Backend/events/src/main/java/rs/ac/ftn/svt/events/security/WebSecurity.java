package rs.ac.ftn.svt.events.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

@Component
class WebSecurity {
    @Autowired
    private UserService userService;

    public boolean checkClubId(Authentication authentication, HttpServletRequest request, int id) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userService.findByUsername(userDetails.getUsername());
        return id == user.getId();
    }
}
