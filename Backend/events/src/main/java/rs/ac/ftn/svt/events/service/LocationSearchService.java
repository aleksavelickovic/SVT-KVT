package rs.ac.ftn.svt.events.service;

import rs.ac.ftn.svt.events.model.dto.LocationSearchRequest;
import rs.ac.ftn.svt.events.model.dto.LocationSearchResultDTO;

import java.util.List;

public interface LocationSearchService {

    void indexLocation(Long locationId);

    void deleteLocation(Long locationId);

    void initializeIndex();

    List<LocationSearchResultDTO> search(LocationSearchRequest request);

    List<LocationSearchResultDTO> moreLikeThis(Long locationId);
}
