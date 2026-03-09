package com.example.fooddelivery.fooddelivery.services;

import com.example.fooddelivery.fooddelivery.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access-token-expiry}")
    private long accessTokenExpiry;

    // Builds a signed HS256 JWT containing userId, email, and userType as claims
    public String generateAccessToken(User user) {
        return Jwts.builder()
                .subject(String.valueOf(user.getId()))
                .claim("email", user.getEmail())
                .claim("userType", user.getUserType().name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpiry))
                .signWith(getSigningKey())
                .compact();
    }

    // Generates a random UUID string used as a raw refresh token before hashing
    public String generateRawRefreshToken() {
        return UUID.randomUUID().toString();
    }

    // Verifies the JWT signature and expiry; returns parsed claims or throws JwtException if invalid
    public Claims validateAccessToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Computes a SHA-256 hash of the raw token so only the hash is persisted — never the raw value
    public String hashToken(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }

    // Creates an httpOnly, SameSite=Strict cookie; set secure=true in production (HTTPS)
    public ResponseCookie buildCookie(String name, String value, int maxAgeSeconds) {
        return ResponseCookie.from(name, value)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(maxAgeSeconds)
                .sameSite("Strict")
                .build();
    }

    // Extracts the userId stored as the JWT subject claim
    public int extractUserId(Claims claims) {
        return Integer.parseInt(claims.getSubject());
    }

    // Extracts the userType (CUSTOMER / SELLER / DELIVERYAGENT) from the JWT claims
    public String extractUserType(Claims claims) {
        return claims.get("userType", String.class);
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
