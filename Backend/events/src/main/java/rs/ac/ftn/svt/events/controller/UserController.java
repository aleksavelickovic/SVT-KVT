package rs.ac.ftn.svt.events.controller;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import rs.ac.ftn.svt.events.model.dto.AccountRequestDTO;
import rs.ac.ftn.svt.events.model.dto.JwtAuthenticationRequest;
import rs.ac.ftn.svt.events.model.dto.RejectionDTO;
import rs.ac.ftn.svt.events.model.dto.UserDTO;
import rs.ac.ftn.svt.events.model.entity.AccountRequest;
import rs.ac.ftn.svt.events.model.entity.Location;
import rs.ac.ftn.svt.events.model.entity.RequestStatus;
import rs.ac.ftn.svt.events.model.entity.User;
import rs.ac.ftn.svt.events.security.TokenUtils;
import rs.ac.ftn.svt.events.service.AccountRequestService;
import rs.ac.ftn.svt.events.service.LocationService;
import rs.ac.ftn.svt.events.service.UserService;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    LocationService locationService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    AccountRequestService accountRequestService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    /* Ili preporucen nacin: Constructor Dependency Injection
    @Autowired
    public UserController(UserServiceImpl userService, AuthenticationManager authenticationManager,
                          UserDetailsService userDetailsService, TokenUtils tokenUtils){
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.tokenUtils = tokenUtils;requests
    }
    */
    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<UserDTO> create(@RequestBody @Validated UserDTO newUser) {

        User createdUser = userService.createUser(newUser);

        if (createdUser == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
        }
        UserDTO userDTO = new UserDTO(createdUser);

        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @CrossOrigin
    @PatchMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<User> editUser(@RequestBody UserDTO userDTO) {
        User forEdit = userService.findByEmail(userDTO.getEmail());

        forEdit.setName(userDTO.getName());
        forEdit.setAddress(userDTO.getAddress());
        forEdit.setCity(userDTO.getCity());
        forEdit.setPhoneNumber(userDTO.getPhone_number());
        forEdit.setEmail(userDTO.getEmail());
        forEdit.setImageFilename(userDTO.getImageFilename());

        return ResponseEntity.ok(userService.save(forEdit));
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<UserDTO> createAuthenticationToken(
            @RequestBody JwtAuthenticationRequest authenticationRequest, HttpServletResponse response, HttpSession session) {
        System.out.println("OKINUO SE LOGIN CONTROLLER! 1");

        // Ukoliko kredencijali nisu ispravni, logovanje nece biti uspesno, desice se
        // AuthenticationException
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        System.out.println("OKINUO SE LOGIN CONTROLLER! 2");

        // Ukoliko je autentifikacija uspesna, ubaci korisnika u trenutni security
        // kontekst
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("OKINUO SE LOGIN CONTROLLER! 3");

        // Kreiraj token za tog korisnika
        UserDetails user = (UserDetails) authentication.getPrincipal();

        User loggedInUser = userService.findByEmail(user.getUsername());
        System.out.println("ULOGOVAN" + loggedInUser.getName());
        session.setAttribute("korisnik", loggedInUser);

        String jwt = tokenUtils.generateToken(user);
        int expiresIn = tokenUtils.getExpiredIn();
        System.out.println("OKINUO SE LOGIN CONTROLLER! 4");
        System.out.println("TOKEN: " + jwt);
        // Vrati token kao odgovor na uspesnu autentifikaciju
        return ResponseEntity.ok(new UserDTO(jwt, (long) expiresIn, loggedInUser.getId(), loggedInUser.getEmail(), loggedInUser.getPassword(), loggedInUser.getName(),
                loggedInUser.getPhoneNumber(), loggedInUser.getAddress(), loggedInUser.getBirthday(), loggedInUser.getCity(), loggedInUser.getImageFilename()));
    }

//    @CrossOrigin
//    @GetMapping("/loggedin")
//   @PreAuthorize("hasAnyRole('USER', 'ADMINISTRATOR')")
//    public ResponseEntity<User> getLoggedInUser(HttpSession session) {
//        User user = (User) session.getAttribute("korisnik");
//        System.out.println("IME KORISNIKA:" + user.getName());
//        return ResponseEntity.ok((User) session.getAttribute("korisnik"));
//    }

    @CrossOrigin
    @GetMapping("/requests")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<List<AccountRequest>> getAllRequests() {
        return ResponseEntity.ok(accountRequestService.findAll());
    }

    @CrossOrigin
    @PostMapping("/requests/add")
    public ResponseEntity<AccountRequest> create(@RequestBody AccountRequestDTO dto) {
        return ResponseEntity.ok(accountRequestService.createAccountRequest(dto));
    }

    @CrossOrigin
    @PatchMapping("/requests/{id}")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<User> accept(@PathVariable Long id, @RequestBody RejectionDTO rejectionDTO) {
        if (rejectionDTO.reason.equals("n")) {
            AccountRequest accountRequest = accountRequestService.findOne(id);
            accountRequest.setStatus(RequestStatus.ACCEPTED);
            accountRequestService.save(accountRequest);

            User newUser = new User();
            newUser.setAddress(accountRequest.getAddress());
            newUser.setCreatedAt(LocalDate.now());
            newUser.setEmail(accountRequest.getEmail());
            newUser.setPassword(accountRequest.getPassword());

            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(newUser.getEmail());
            msg.setSubject("Vas zahtev za registraciju je prihvacen!");
            msg.setText("Postovani korisnice,  " + "\n\n" + "Vas zahtev za registraciju je prihvacen i mozete se ulogovati na svoj novi korisnicki nalog.\n\n"
                    + "Nalog je napravljen na dan: " + newUser.getCreatedAt());

            try {
                mailSender.send(msg);
                System.out.println("Poslat MEJL!");
            } catch (Exception ex) {
                System.err.println("Greška pri slanju mejla: " + ex.getMessage());
            }

            return ResponseEntity.ok(userService.createUser(newUser));
        }
        AccountRequest accountRequest = accountRequestService.findOne(id);

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(accountRequest.getEmail());
        msg.setSubject("Vas zahtev za registraciju je odbijen!");
        msg.setText("Postovani korisnice,  " + "\n\n" + "Nazalost, vas zahtev za kreiranje naloga je odbijen.\n\n"
                + "Razlog odbijanja: " + rejectionDTO.reason);

        try {
            mailSender.send(msg);
            System.out.println("Poslat MEJL!");
        } catch (Exception ex) {
            System.err.println("Greška pri slanju mejla: " + ex.getMessage());
        }
        accountRequest.setStatus(RequestStatus.REJECTED);
        accountRequest.setRejectionReason(rejectionDTO.reason);
        accountRequestService.save(accountRequest);

        return ResponseEntity.ok(null);

    }

    @CrossOrigin
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public List<User> loadAll() {
        return this.userService.findAll();
    }

    @CrossOrigin
    @PatchMapping("/{email}")
    @PreAuthorize("hasAnyRole('USER', 'ADMINISTRATOR')")
    public ResponseEntity<User> changePassword(@PathVariable String email, @RequestBody changePswDTO request) {
        User user = userService.findByEmail(email);
        if (passwordEncoder.matches(request.oldpassword, user.getPassword())) {
            System.out.println("SIFRE SE POKLAPAJU!");
            user.setPassword(passwordEncoder.encode(request.newpassword));

            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(email);
            msg.setSubject("Promena lozinke");
            msg.setText("Postovani gospodine " + user.getName() + ",\n\n" + "Vasa lozinka je uspesno promenjena!");

            try {
                mailSender.send(msg);
                System.out.println("Poslat MEJL!");
            } catch (Exception ex) {
                System.err.println("Greška pri slanju mejla: " + ex.getMessage());
            }

            return ResponseEntity.ok(userService.save(user));
        }

        return ResponseEntity.status(403).build();
    }

    @CrossOrigin
    @PatchMapping("/{userEmail}/{locationId}")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<Location> removeManager(@PathVariable String userEmail, @PathVariable Long locationId) {
        User user = userService.findByEmail(userEmail);
        Location location = locationService.findOne(locationId);
        user.getManages().removeIf(l -> l.getId().equals(location.getId()));
        userService.save(user);
        location.getManagedBy().removeIf(user1 -> user1.getEmail().equals(user.getEmail()));

        return ResponseEntity.ok(locationService.save(location));
    }

    @NoArgsConstructor
    public static class changePswDTO {
        public String oldpassword;
        public String newpassword;
    }

    @CrossOrigin
    @GetMapping("/details")
    @PreAuthorize("hasAnyRole('USER', 'ADMINISTRATOR')")
    public User user(Principal user) {
        return this.userService.findByEmail(user.getName());
    }
}
