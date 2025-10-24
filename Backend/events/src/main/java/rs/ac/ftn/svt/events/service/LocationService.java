package rs.ac.ftn.svt.events.service;

import rs.ac.ftn.svt.events.model.dto.LocationDTO;
import rs.ac.ftn.svt.events.model.entity.Location;

import java.util.List;

public interface LocationService {

    List<Location> findAll();

    Location findOne(Long id);

    Location createLocation(LocationDTO locationDTO);

    Location save(Location location);

    void delete(Long id);

    List<Location> findAllManagedLocations(Long id);

}
