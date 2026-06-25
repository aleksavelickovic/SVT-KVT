package rs.ac.ftn.svt.events.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LocationSearchRequest {

    private String name;
    private String description;
    private String pdfText;

    private Integer reviewCountFrom;
    private Integer reviewCountTo;

    private Double performanceFrom;
    private Double performanceTo;

    private Double soundFrom;
    private Double soundTo;

    private Double lightingFrom;
    private Double lightingTo;

    private Double venueFrom;
    private Double venueTo;

    private Double overallImpressionFrom;
    private Double overallImpressionTo;

    private String operator;
    private String sortDirection;
}
