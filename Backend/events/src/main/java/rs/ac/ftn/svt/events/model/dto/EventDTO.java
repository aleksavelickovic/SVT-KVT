package rs.ac.ftn.svt.events.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class EventDTO {

    private Long id;
    private Long locationId;
    @NotBlank
    private String name;
    @NotBlank
    private String address;
    @NotBlank
    private String type;
    @NotBlank
    private LocalDate date;
    @NotBlank
    private Double price;
    @NotBlank
    private Boolean recurrent;
}
