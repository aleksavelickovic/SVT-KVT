package rs.ac.ftn.svt.events.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rs.ac.ftn.svt.events.model.Comment;
import rs.ac.ftn.svt.events.repository.CommentRepository;
import rs.ac.ftn.svt.events.service.CommentService;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Comment> findAll() {
//        return List.of();
        return commentRepository.findAll();
    }
}
