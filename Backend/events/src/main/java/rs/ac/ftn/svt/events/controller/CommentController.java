package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import rs.ac.ftn.svt.events.model.dto.CommentDTO;
import rs.ac.ftn.svt.events.model.entity.Comment;
import rs.ac.ftn.svt.events.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    @CrossOrigin
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<List<Comment>> findAllComments() {
        return ResponseEntity.ok(commentService.findAll());
    }

    @CrossOrigin
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATOR', 'USER')")
    public ResponseEntity<Comment> addComment(@RequestBody CommentDTO commentDTO) {
        return ResponseEntity.ok(commentService.addComment(commentDTO));
    }
}
