package com.FGhub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.FGhub.model.user;

public interface userRepository extends MongoRepository<user, String> {
    user findByUsername(String username);
}
