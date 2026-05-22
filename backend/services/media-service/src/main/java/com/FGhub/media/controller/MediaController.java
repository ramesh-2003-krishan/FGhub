package com.FGhub.media.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.FGhub.media.model.Media;
import com.FGhub.media.repository.MediaRepository;

@RestController
@RequestMapping("/api/media")
@CrossOrigin(origins = "http://localhost:3000")
public class MediaController {

    private final MediaRepository repository;

    public MediaController(MediaRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public Media createMedia(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("date") String date,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        Media media = new Media(title, description, date);
        media.setCategory(category);

        if (image != null && !image.isEmpty()) {
            String base64Image = java.util.Base64.getEncoder().encodeToString(image.getBytes());
            media.setImg("data:" + image.getContentType() + ";base64," + base64Image);
        }

        return repository.save(media);
    }

    @GetMapping
    public List<Media> getAllMedia() {
        return repository.findAll();
    }

    @PutMapping("/{id}/rating")
    public Media rateMedia(@PathVariable String id, @RequestParam double rating) {
        return repository.findById(id).map(media -> {
            int currentCount = media.getRatingCount();
            double currentAverage = media.getAverageRating();
            double newAverage = (currentAverage * currentCount + rating) / (currentCount + 1);
            media.setAverageRating(newAverage);
            media.setRatingCount(currentCount + 1);
            return repository.save(media);
        }).orElseThrow(() -> new RuntimeException("Media not found with id" + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMedia(@PathVariable String id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.status(404).body("Media not found");
        }
        repository.deleteById(id);
        return ResponseEntity.ok("Media deleted successfully");
    }

    @PostMapping("/edit/{id}")
    public Media editMedia(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("date") String date,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        return repository.findById(id).map(media -> {
            media.setTitle(title);
            media.setDescription(description);
            media.setDate(date);
            media.setCategory(category);

            if (image != null && !image.isEmpty()) {
                try {
                    String base64Image = java.util.Base64.getEncoder().encodeToString(image.getBytes());
                    media.setImg("data:" + image.getContentType() + ";base64," + base64Image);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to process image", e);
                }
            }

            return repository.save(media);
        }).orElseThrow(() -> new RuntimeException("Media not found with id" + id));
    }
}
