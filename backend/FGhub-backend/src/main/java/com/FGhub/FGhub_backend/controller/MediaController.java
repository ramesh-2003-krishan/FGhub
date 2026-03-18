package com.FGhub.controller;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FGhub.model.Media;
import com.FGhub.repository.MediaRepository;

@RestController
@RequestMapping("/api/media")
@CrossOrigin

public class MediaController {

    private final MediaRepository repository;

    public MediaController(MediaRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Media createMedia(@RequestBody Media media) {
        return repository.save(media);
    }

    @GetMapping
    public List<Media> getAllMedia() {
        return repository.findAll();
    }
}