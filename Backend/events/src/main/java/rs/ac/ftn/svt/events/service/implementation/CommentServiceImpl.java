package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.dto.CommentDTO;
import rs.ac.ftn.svt.events.model.entity.Comment;
import rs.ac.ftn.svt.events.repository.CommentRepository;
import rs.ac.ftn.svt.events.repository.UserRepository;
import rs.ac.ftn.svt.events.service.CommentService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Comment> findAll() {
//        return List.of();
        return commentRepository.findAll();
    }

    @Override
    public Comment addComment(CommentDTO commentDTO) {
        Comment newComment = new Comment();
        newComment.setText(commentDTO.getText());
        newComment.setCreatedAt(LocalDateTime.now());
        newComment.setBelongsTo(userRepository.findByEmail(commentDTO.getBelongsTo().getEmail()));
        newComment.setRepliesTo(commentDTO.getRepliesTo());

        return commentRepository.save(newComment);
    }
}
