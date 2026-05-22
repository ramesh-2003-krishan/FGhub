package com.FGhub.recommendation.controller;

import java.util.AbstractMap;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import com.FGhub.recommendation.model.Media;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AiController {

    private final RestClient mediaRestClient;

    public AiController(RestClient mediaRestClient) {
        this.mediaRestClient = mediaRestClient;
    }

    @PostMapping("/recommend")
    public List<Media> recommend(@RequestBody Map<String, String> req) {
        String rawMessage = req.get("message");
        if (rawMessage == null || rawMessage.trim().isEmpty()) {
            return List.of();
        }

        String userInput = rawMessage
            .toLowerCase()
            .replaceAll("[^a-z0-9\\s]", " ")
            .replaceAll("\\s+", " ")
            .trim();

        List<String> stopWords = List.of(
            "i", "want", "a", "an", "the", "is", "are", "with", "and", "or", "to", "of", "for", "in", "on", "at", "very", "lot",
            "please", "show", "recommend", "give", "me"
        );

        List<String> keywords = Arrays.stream(userInput.split(" "))
            .filter(word -> word != null && !word.isBlank())
            .map(String::trim)
            .filter(word -> !stopWords.contains(word))
            .toList();

        List<Media> allMedia = mediaRestClient.get()
            .uri("/api/media")
            .retrieve()
            .body(new ParameterizedTypeReference<List<Media>>() {});

        if (allMedia == null) {
            return List.of();
        }

        return allMedia.stream()
            .map(media -> {
                int score = 0;

                String title = media.getTitle() == null ? "" : media.getTitle().toLowerCase();
                String description = media.getDescription() == null ? "" : media.getDescription().toLowerCase();
                String category = media.getCategory() == null ? "" : media.getCategory().toLowerCase();

                for (String word : keywords) {
                    if (description.contains(word)) score += 2;
                    if (title.contains(word)) score += 1;
                    if (category.contains(word)) score += 1;
                }

                return new AbstractMap.SimpleEntry<>(media, score);
            })
            .filter(entry -> entry.getValue() > 0)
            .sorted((a, b) -> b.getValue() - a.getValue())
            .limit(5)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());
    }
}
