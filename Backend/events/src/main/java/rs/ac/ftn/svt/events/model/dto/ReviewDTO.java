package rs.ac.ftn.svt.events.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.ftn.svt.events.model.entity.Event;
import rs.ac.ftn.svt.events.model.entity.Rate;
import rs.ac.ftn.svt.events.model.entity.User;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ReviewDTO {

    private Long id;

    private LocalDateTime createdAt;

    private Integer eventCount;

    private Boolean hidden;

    private Event event;

    private Rate rate;

    private String madeBy;
}
