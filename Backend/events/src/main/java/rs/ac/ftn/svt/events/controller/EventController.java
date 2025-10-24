package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.ac.ftn.svt.events.model.dto.EventDTO;
import rs.ac.ftn.svt.events.model.entity.Event;
import rs.ac.ftn.svt.events.service.EventService;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @CrossOrigin
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
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

    @CrossOrigin
    @PatchMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<Event> editEvent(@PathVariable Long id, @RequestBody EventDTO eventDTO) {
        Event event = eventService.findOne(id);
        event.setName(eventDTO.getName());
        event.setAddress(eventDTO.getAddress());
        event.setType(eventDTO.getType());
        event.setDate(eventDTO.getDate());
        event.setPrice(eventDTO.getPrice());
        event.setRecurrent(eventDTO.getRecurrent());
        event.setLocation(eventDTO.getLocation());

        return ResponseEntity.ok(eventService.save(event));
    }

    @CrossOrigin
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<Event> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.findOne(id));
    }

    @CrossOrigin
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<Event> addEvent(@RequestBody EventDTO eventDTO) {
        System.out.println("POZVANA ADD EVENT!");
        return ResponseEntity.ok(eventService.createEvent(eventDTO));
    }
}
