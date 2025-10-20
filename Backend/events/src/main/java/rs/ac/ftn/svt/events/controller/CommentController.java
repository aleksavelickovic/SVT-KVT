package rs.ac.ftn.svt.events.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rs.ac.ftn.svt.events.model.Comment;
import rs.ac.ftn.svt.events.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Comment>> findAllComments() {
        return ResponseEntity.ok(commentService.findAll());
    }
}
