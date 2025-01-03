package com.example.fooddelivery.fooddelivery.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.fooddelivery.fooddelivery.models.User;
import com.example.fooddelivery.fooddelivery.models.UserType;
import com.example.fooddelivery.fooddelivery.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User signup(User user, String userType) {
        // Check if the email is already in use
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already in use");
        }

        // Set the user type based on the userType passed in the request
        user.setUserType(UserType.valueOf(userType.toUpperCase()));  // Convert string to UserType enum

        // Encode the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the user to the database
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        // Retrieve the user by email
        try {
            User user = userRepository.findByEmail(email);

        // Check if user exists and passwords match
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        System.out.println("Login succcessfull from userRepository");
        return user;
        } catch (Exception e) {
            // Log the error and rethrow the exception
            System.out.println("Error occurred during login: " + e.getMessage());
            throw new RuntimeException("An error occurred during login");
        }
        
    }
}
