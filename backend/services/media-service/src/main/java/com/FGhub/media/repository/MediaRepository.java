package com.FGhub.media.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.FGhub.media.model.Media;

public interface MediaRepository extends MongoRepository<Media, String> {
}
