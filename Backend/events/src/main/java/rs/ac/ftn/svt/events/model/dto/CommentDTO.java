package rs.ac.ftn.svt.events.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rs.ac.ftn.svt.events.model.entity.Comment;
import rs.ac.ftn.svt.events.model.entity.User;

import javax.persistence.Column;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CommentDTO {

    private Long id;

    private String text;

    private LocalDateTime createdAt;

    private UserDTO belongsTo;

    private Comment repliesTo;
}
