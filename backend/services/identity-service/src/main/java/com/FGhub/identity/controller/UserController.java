package com.FGhub.identity.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.FGhub.identity.model.user;
import com.FGhub.identity.repository.userRepository;
import com.FGhub.identity.security.JwtUtil;

import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final userRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserController(userRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public user signup(@RequestBody user user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody user user) {
        user existingUser = userRepository.findByUsername(user.getUsername());

        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            String token = jwtUtil.generateToken(existingUser.getUsername(), existingUser.getEmail());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("username", existingUser.getUsername());
            response.put("email", existingUser.getEmail());

            return ResponseEntity.ok(response);
        }
        
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Invalid username or password");
        return ResponseEntity.status(401).body(errorResponse);
    }
}
