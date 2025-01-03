package com.example.fooddelivery.fooddelivery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.fooddelivery.fooddelivery.models.User;
import com.example.fooddelivery.fooddelivery.services.UserService;

import lombok.Data;


@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
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
        return ResponseEntity.ok(userService.login(loginRequest.getEmail(), loginRequest.getPassword()));
    }
}

@Data
class LoginRequest {
    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
