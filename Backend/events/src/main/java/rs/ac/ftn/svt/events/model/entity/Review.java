package rs.ac.ftn.svt.events.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDateTime createdAt;
    @Column
    private Integer eventCount;
    @Column
    private Boolean hidden;
    @OneToOne
    private Event event;
    @OneToOne
    private Rate rate;
    @Column
    private String madeBy;
    @OneToOne
    private Comment comment;

}
