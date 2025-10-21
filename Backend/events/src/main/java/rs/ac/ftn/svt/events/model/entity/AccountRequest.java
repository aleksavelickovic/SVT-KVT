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
@Table(name = "account_requests")
public class AccountRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String address;
    @Enumerated(EnumType.STRING)
    private RequestStatus status;
    @Column
    private LocalDate createdAt;
    @Column
    private String rejectionReason;
}
