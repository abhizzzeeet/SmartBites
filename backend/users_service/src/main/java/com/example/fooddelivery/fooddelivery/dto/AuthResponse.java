package com.example.fooddelivery.fooddelivery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// Safe response object returned to the client — never includes the password or sensitive fields
@Data
@AllArgsConstructor
public class AuthResponse {
    private int id;
    private String name;
    private String email;
    private String userType;
}
