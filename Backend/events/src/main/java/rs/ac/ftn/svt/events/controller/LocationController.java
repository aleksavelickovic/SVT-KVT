package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.ac.ftn.svt.events.model.dto.LocationDTO;
import rs.ac.ftn.svt.events.model.entity.Location;
import rs.ac.ftn.svt.events.service.LocationService;

import java.util.List;

@RestController
@RequestMapping("/locations")
class LocationController {

    @Autowired
    LocationService locationService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Location>> findAll() {
        return ResponseEntity.ok(locationService.findAll());
    }

    @CrossOrigin
    @PostMapping()
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<Location> addLocation(@RequestBody LocationDTO locationDTO) {
        System.out.println("POZVANA ADD LOCATION!");
        return ResponseEntity.ok(locationService.createLocation(locationDTO));
    }

}
