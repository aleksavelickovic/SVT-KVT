package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.ac.ftn.svt.events.model.dto.LocationDTO;
import rs.ac.ftn.svt.events.model.dto.LocationSearchRequest;
import rs.ac.ftn.svt.events.model.dto.LocationSearchResultDTO;
import rs.ac.ftn.svt.events.model.entity.Location;
import rs.ac.ftn.svt.events.model.entity.User;
import rs.ac.ftn.svt.events.service.LocationService;
import rs.ac.ftn.svt.events.service.LocationSearchService;
import rs.ac.ftn.svt.events.service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    LocationService locationService;

    @Autowired
    UserService userService;

    @Autowired
    LocationSearchService locationSearchService;

    @Autowired
    private JavaMailSender mailSender;


    @CrossOrigin
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<List<Location>> findAll() {
        return ResponseEntity.ok(locationService.findAll());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<Location> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.findOne(id));
    }

    @CrossOrigin
    @GetMapping("/{id}/managers")
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<List<User>> getAllManagers(@PathVariable Long id) {
        List<User> users = new ArrayList<User>();
        for (User user : userService.findAll()) {
            for (Location location : user.getManages()) {
                if (location.getId().equals(id)) {
                    users.add(user);
                }
            }
        }
        return ResponseEntity.ok(users);
    }

    @CrossOrigin
    @PatchMapping("/{locationId}/{userEmail}")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<Location> addManager(@PathVariable Long locationId, @PathVariable String userEmail) {
        Location location = locationService.findOne(locationId);
        User user = userService.findByEmail(userEmail);
        location.getManagedBy().add(user);

        user.getManages().add(location);
        userService.save(user);

        return ResponseEntity.ok(locationService.save(location));
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<?> deleteLocation(@PathVariable Long id) {
        System.out.println("DELETE OKINUTO!");
        locationService.delete(id);
        return ResponseEntity.ok("Obrisano!");
    }

    @CrossOrigin
    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<Location> editLocation(@RequestBody LocationDTO locationDTO, @PathVariable String id) {
        System.out.println("ID OD DTO: " + locationDTO.getId());
        Location locationForEdit = locationService.findOne(Long.valueOf(id));
        locationForEdit.setName(locationDTO.getName());
        locationForEdit.setDescription(locationDTO.getDescription());
        locationForEdit.setAddress(locationDTO.getAddress());
        locationForEdit.setType(locationDTO.getType());
        locationForEdit.setTotalRating(locationDTO.getTotalRating());
        locationForEdit.setDocumentFilename(locationDTO.getDocumentFilename());

        Location saved = locationService.save(locationForEdit);
        locationSearchService.indexLocation(saved.getId());
        return ResponseEntity.ok(saved);
    }

    @CrossOrigin
    @PostMapping()
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<Location> addLocation(@RequestBody LocationDTO locationDTO) {
        System.out.println("POZVANA ADD LOCATION!");
        return ResponseEntity.ok(locationService.createLocation(locationDTO));
    }

    @CrossOrigin
    @GetMapping("/managed/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<List<Location>> findManagedLocations(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.findAllManagedLocations(id));
    }

    @CrossOrigin
    @PostMapping("/search")
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<List<LocationSearchResultDTO>> search(@RequestBody LocationSearchRequest request) {
        return ResponseEntity.ok(locationSearchService.search(request));
    }

    @CrossOrigin
    @GetMapping("/{id}/more-like-this")
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<List<LocationSearchResultDTO>> moreLikeThis(@PathVariable Long id) {
        return ResponseEntity.ok(locationSearchService.moreLikeThis(id));
    }

}
