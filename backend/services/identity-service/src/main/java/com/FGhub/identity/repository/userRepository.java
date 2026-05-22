package com.FGhub.identity.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.FGhub.identity.model.user;

public interface userRepository extends MongoRepository<user, String> {
    user findByUsername(String username);
}
