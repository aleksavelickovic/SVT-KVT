package rs.ac.ftn.svt.events.service;

import rs.ac.ftn.svt.events.model.dto.EventDTO;
import rs.ac.ftn.svt.events.model.entity.Event;

import java.util.List;

public interface EventService {
    List<Event> findAll();

    Event findOne(Long id);

    Event createEvent(EventDTO eventDTO);

    Event save(Event event);

    void delete(Long id);
}
