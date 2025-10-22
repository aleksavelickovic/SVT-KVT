package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

}
