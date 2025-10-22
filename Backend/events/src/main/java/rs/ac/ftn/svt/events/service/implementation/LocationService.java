package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.dto.LocationDTO;
import rs.ac.ftn.svt.events.model.entity.Location;
import rs.ac.ftn.svt.events.repository.LocationRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
class LocationService implements rs.ac.ftn.svt.events.service.LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    @Override
    public Location findOne(Long id) {
        return locationRepository.findFirstById(id);
    }

    @Override
    public Location createLocation(LocationDTO locationDTO) {
        Optional<Location> location = locationRepository.findFirstByName((locationDTO.getName()));

        if (location.isPresent()) {
            return null;
        }
        Location newLocation = new Location();

        newLocation.setCreatedAt(LocalDate.now());
        newLocation.setName(locationDTO.getName());
        newLocation.setAddress(locationDTO.getAddress());
        newLocation.setDescription(locationDTO.getDescription());
        newLocation.setType(locationDTO.getType());

        locationRepository.save(newLocation);

        return newLocation;
    }

    @Override
    public Location save(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public void delete(Long id) {
        locationRepository.delete(locationRepository.findFirstById(id));
    }
}
