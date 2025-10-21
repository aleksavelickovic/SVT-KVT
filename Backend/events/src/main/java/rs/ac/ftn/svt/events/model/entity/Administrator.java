package rs.ac.ftn.svt.events.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Getter
@Setter
//@NoArgsConstructor
//@AllArgsConstructor
@Entity
//@Table(name = "administrators")
@DiscriminatorValue("ROLE_ADMINISTRATOR")
public class Administrator extends User {
}
