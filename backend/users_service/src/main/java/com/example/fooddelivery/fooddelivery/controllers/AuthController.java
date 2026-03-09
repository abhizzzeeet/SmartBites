package com.example.fooddelivery.fooddelivery.controllers;

import com.example.fooddelivery.fooddelivery.dto.AuthResponse;
import com.example.fooddelivery.fooddelivery.models.User;
import com.example.fooddelivery.fooddelivery.services.JwtService;
import com.example.fooddelivery.fooddelivery.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private JwtService jwtService;

    // Validates credentials, sets httpOnly access + refresh token cookies, and returns safe user profile
    @PostMapping("/{userType}/login")
    public ResponseEntity<AuthResponse> login(@PathVariable String userType,
                                              @RequestBody LoginRequest loginRequest,
                                              HttpServletResponse response) {
        try {
            User user = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
            String accessToken = jwtService.generateAccessToken(user);
            String rawRefreshToken = userService.createRefreshToken(user.getId());

            response.addHeader("Set-Cookie", jwtService.buildCookie("accessToken", accessToken, 15 * 60).toString());
            response.addHeader("Set-Cookie", jwtService.buildCookie("refreshToken", rawRefreshToken, 7 * 24 * 60 * 60).toString());

            return ResponseEntity.ok(new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getUserType().name()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // Registers a new user and returns their profile; does not issue tokens (user must log in separately)
    @PostMapping("/{userType}/signup")
    public ResponseEntity<AuthResponse> signup(@PathVariable String userType,
                                               @RequestBody User user) {
        User saved = userService.signup(user, userType);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(saved.getId(), saved.getName(), saved.getEmail(), saved.getUserType().name()));
    }

    // Validates the httpOnly refresh token cookie and issues a new access token cookie in response
    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(
            @CookieValue(name = "refreshToken", required = false) String rawRefreshToken,
            HttpServletResponse response) {
        if (rawRefreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            int userId = userService.validateRefreshToken(rawRefreshToken);
            User user = userService.getUserById(userId);
            String newAccessToken = jwtService.generateAccessToken(user);
            response.addHeader("Set-Cookie", jwtService.buildCookie("accessToken", newAccessToken, 15 * 60).toString());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // Revokes the refresh token in the DB and clears both auth cookies to end the session
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(name = "refreshToken", required = false) String rawRefreshToken,
            HttpServletResponse response) {
        if (rawRefreshToken != null) {
            userService.revokeRefreshToken(rawRefreshToken);
        }
        response.addHeader("Set-Cookie", jwtService.buildCookie("accessToken", "", 0).toString());
        response.addHeader("Set-Cookie", jwtService.buildCookie("refreshToken", "", 0).toString());
        return ResponseEntity.ok().build();
    }

    // Returns the profile of the currently authenticated user using the userId from the JWT SecurityContext
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        int userId = (int) authentication.getPrincipal();
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(new AuthResponse(user.getId(), user.getName(), user.getEmail(), user.getUserType().name()));
    }
}
