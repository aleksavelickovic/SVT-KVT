package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import rs.ac.ftn.svt.events.model.dto.*;
import rs.ac.ftn.svt.events.model.entity.AccountRequest;
import rs.ac.ftn.svt.events.model.entity.RequestStatus;
import rs.ac.ftn.svt.events.model.entity.User;
import rs.ac.ftn.svt.events.security.TokenUtils;
import rs.ac.ftn.svt.events.service.AccountRequestService;
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
    AuthenticationManager authenticationManager;

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    AccountRequestService accountRequestService;
    @Autowired
    private PasswordEncoder passwordEncoder;

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
                loggedInUser.getPhoneNumber(), loggedInUser.getAddress(), loggedInUser.getBirthday(), loggedInUser.getCity()));
    }

    @CrossOrigin
    @GetMapping("/loggedin")
//    @PreAuthorize("hasAnyRole('USER', 'ADMINISTRATOR')")
    public ResponseEntity<User> getLoggedInUser(HttpSession session) {
        User user = (User) session.getAttribute("korisnik");
        System.out.println("IME KORISNIKA:" + user.getName());
        return ResponseEntity.ok((User) session.getAttribute("korisnik"));
    }

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
            newUser.setEmail(accountRequest.getEmail());

            return ResponseEntity.ok(userService.createUser(newUser));
        }
        AccountRequest accountRequest = accountRequestService.findOne(id);
        accountRequest.setStatus(RequestStatus.REJECTED);
        accountRequest.setRejectionReason(rejectionDTO.reason);
        accountRequestService.save(accountRequest);

        return ResponseEntity.ok(null);

    }

    @CrossOrigin
    @GetMapping("/all")
//    @PreAuthorize("hasRole('ROLE_ADMINISTRATOR')")
    public List<User> loadAll() {
        return this.userService.findAll();
    }

    @CrossOrigin
    @GetMapping("/details")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public User user(Principal user) {
        return this.userService.findByEmail(user.getName());
    }
}
