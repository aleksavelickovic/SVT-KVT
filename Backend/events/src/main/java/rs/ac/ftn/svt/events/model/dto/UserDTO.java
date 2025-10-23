package rs.ac.ftn.svt.events.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.ftn.svt.events.model.entity.User;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private String accessToken;
    private Long expiresIn;
    private Long id;
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String name;
    @NotBlank
    private String phone_number;
    @NotBlank
    private String address;
    @NotBlank
    private LocalDate birthday;
    @NotBlank
    private String city;

    public UserDTO(User createdUser) {
        this.id = createdUser.getId();
        this.email = createdUser.getEmail();
        this.password = createdUser.getPassword();
        this.name = createdUser.getName();
        this.phone_number = createdUser.getPhoneNumber();
        this.address = createdUser.getAddress();
        this.birthday = createdUser.getBirthday();
        this.city = createdUser.getCity();
    }
}
