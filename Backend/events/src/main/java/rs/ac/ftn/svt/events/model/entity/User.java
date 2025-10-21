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
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype", discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("ROLE_USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //    @Column
//    private String username;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String name;
    @Column
    private LocalDate createdAt;
    @Column
    private String phoneNumber;
    @Column
    private LocalDate birthday;
    @Column
    private String address;
    @Column
    private String city;
}
