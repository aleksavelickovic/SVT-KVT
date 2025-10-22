package rs.ac.ftn.svt.events.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
    @Column
    private String description;
    @Column
    private LocalDate createdAt;
    @Column
    private String address;
    //    @Column       // TODO vrati se ovde kad dodas rating sistem
//    private Double totalRating;
    @Column
    private String type;

}
