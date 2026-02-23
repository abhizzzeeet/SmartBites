package com.example.fooddelivery.fooddelivery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.fooddelivery.fooddelivery.models.User;
import com.example.fooddelivery.fooddelivery.services.UserService;

import lombok.Data;

@Data
class LoginRequest {
    private String email;
    private String password;
}

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/{userType}/signup")
    public ResponseEntity<User> signup(@PathVariable String userType, @RequestBody User user) {
        System.out.println("Signup for userType: " + userType);
        // Pass the userType to the service
        return ResponseEntity.ok(userService.signup(user, userType));
    }

    @PostMapping("/{userType}/login")
    public ResponseEntity<User> login(@PathVariable String userType, @RequestBody LoginRequest loginRequest) {
        System.out.println("Login for userType: " + userType);
        try {
            return ResponseEntity.ok(userService.login(loginRequest.getEmail(), loginRequest.getPassword()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}


