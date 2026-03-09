package com.example.fooddelivery.fooddelivery.services;

import com.example.fooddelivery.fooddelivery.models.RefreshToken;
import com.example.fooddelivery.fooddelivery.models.User;
import com.example.fooddelivery.fooddelivery.models.UserType;
import com.example.fooddelivery.fooddelivery.repositories.RefreshTokenRepository;
import com.example.fooddelivery.fooddelivery.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Value("${jwt.refresh-token-expiry}")
    private long refreshTokenExpiry;

    // Validates email uniqueness, hashes the password, assigns userType, and persists the new user
    public User signup(User user, String userType) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already in use");
        }
        user.setUserType(UserType.valueOf(userType.toUpperCase()));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Looks up user by email and verifies the BCrypt password; throws if credentials are invalid
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }

    // Generates a raw refresh token, stores its SHA-256 hash in the DB, and returns the raw value to the caller
    public String createRefreshToken(int userId) {
        String rawToken = jwtService.generateRawRefreshToken();
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setTokenHash(jwtService.hashToken(rawToken));
        refreshToken.setUserId(userId);
        refreshToken.setExpiresAt(LocalDateTime.now().plus(refreshTokenExpiry, ChronoUnit.MILLIS));
        refreshTokenRepository.save(refreshToken);
        return rawToken;
    }

    // Looks up the hashed token in DB, checks it is not revoked or expired, and returns the owner's userId
    public int validateRefreshToken(String rawToken) {
        String hash = jwtService.hashToken(rawToken);
        RefreshToken stored = refreshTokenRepository.findByTokenHash(hash)
                .orElseThrow(() -> new RuntimeException("Refresh token not found"));
        if (stored.isRevoked()) {
            throw new RuntimeException("Refresh token has been revoked");
        }
        if (stored.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Refresh token has expired");
        }
        return stored.getUserId();
    }

    // Marks the stored refresh token as revoked to invalidate the session without deleting the record
    public void revokeRefreshToken(String rawToken) {
        String hash = jwtService.hashToken(rawToken);
        refreshTokenRepository.findByTokenHash(hash).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    // Fetches the full User entity by primary key; used by /auth/me and the refresh flow
    public User getUserById(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
