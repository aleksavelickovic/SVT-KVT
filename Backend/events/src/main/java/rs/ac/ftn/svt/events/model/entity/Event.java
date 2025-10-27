package rs.ac.ftn.svt.events.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;
    @Column
    private String address;
    @Column
    private String type;
    @Column
    private LocalDate date;
    @Column
    private Double price;
    @Column
    private Boolean recurrent;
    @OneToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Location location;
    @Column
    private String imageFilename;
}
