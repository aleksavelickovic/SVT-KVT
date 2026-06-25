package rs.ac.ftn.svt.events.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RateDTO {

    private Long id;


    private Integer performance;

    private Integer sound;

    private Integer lighting;

    private Integer venue;

    private Integer overallImpression;
}
