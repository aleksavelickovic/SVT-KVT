package rs.ac.ftn.svt.events.service;

import rs.ac.ftn.svt.events.model.dto.CommentDTO;
import rs.ac.ftn.svt.events.model.entity.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> findAll();

    Comment addComment(CommentDTO commentDTO);
}
