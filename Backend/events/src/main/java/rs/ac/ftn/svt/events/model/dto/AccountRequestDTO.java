package rs.ac.ftn.svt.events.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.ftn.svt.events.model.entity.AccountRequest;
import rs.ac.ftn.svt.events.model.entity.RequestStatus;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class AccountRequestDTO {

    private Long id;
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String address;
    @NotBlank
    private String rejectionReason;

    public AccountRequestDTO(AccountRequest accountRequest) {
        this.id = accountRequest.getId();
        this.email = accountRequest.getEmail();
        this.password = accountRequest.getPassword();
        this.address = accountRequest.getAddress();
        this.rejectionReason = accountRequest.getRejectionReason();
    }
}
