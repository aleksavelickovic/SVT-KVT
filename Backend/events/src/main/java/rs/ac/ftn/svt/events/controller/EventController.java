package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.ac.ftn.svt.events.model.entity.Event;
import rs.ac.ftn.svt.events.service.EventService;

import java.util.List;

@RestController
@RequestMapping("/events")
class EventController {

    @Autowired
    private EventService eventService;

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Event>> findAll() {
        return ResponseEntity.ok(eventService.findAll());
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATOR')")
    public ResponseEntity<?> deleteLocation(@PathVariable Long id) {
        System.out.println("DELETE EVENT-A OKINUTO!");
        eventService.delete(id);
        return ResponseEntity.ok(null);
    }
}
