package com.FGhub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.FGhub.model.Media;

public interface MediaRepository extends MongoRepository<Media, String> {
}