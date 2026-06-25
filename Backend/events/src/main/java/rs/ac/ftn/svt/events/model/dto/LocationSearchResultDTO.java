package rs.ac.ftn.svt.events.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationSearchResultDTO {

    private Long id;
    private String name;
    private String description;
    private LocalDate createdAt;
    private String address;
    private String type;
    private Double totalRating;
    private String imageFilename;
    private String documentFilename;

    private Integer reviewCount;
    private Double performanceAverage;
    private Double soundAverage;
    private Double lightingAverage;
    private Double venueAverage;
    private Double overallImpressionAverage;

    private String highlight;
}
