package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.dto.EventDTO;
import rs.ac.ftn.svt.events.model.entity.Event;
import rs.ac.ftn.svt.events.repository.EventRepository;
import rs.ac.ftn.svt.events.service.EventService;

import java.util.List;
import java.util.Optional;

@Service
class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Override
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    @Override
    public Event findOne(Long id) {
        return eventRepository.findFirstById(id);
    }

    @Override
    public Event createEvent(EventDTO eventDTO) {
        Optional<Event> event = eventRepository.findFirstByName(eventDTO.getName());

        if (event.isPresent()) {
            return null;
        }
        Event newEvent = new Event();

        newEvent.setName(eventDTO.getName());
        newEvent.setAddress(eventDTO.getAddress());
        newEvent.setType(eventDTO.getType());
        newEvent.setDate(eventDTO.getDate());
        newEvent.setPrice(eventDTO.getPrice());
        newEvent.setRecurrent(eventDTO.getRecurrent());
        newEvent.setLocation(eventDTO.getLocation());

        eventRepository.save(newEvent);

        return newEvent;
    }

    @Override
    public Event save(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public void delete(Long id) {
        eventRepository.delete(eventRepository.findFirstById(id));
    }
}
