package com.FGhub.identity.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FGhub.identity.model.user;
import com.FGhub.identity.repository.userRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final userRepository userRepository;

    public UserController(userRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public user signup(@RequestBody user user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public user login(@RequestBody user user) {
        user existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return existingUser;
        }
        return null;
    }
}
