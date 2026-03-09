package com.example.restaurants_service.restaurants_service.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;

// Validation-only JWT service — this service never issues tokens, only verifies them
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    // Verifies the JWT signature and expiry against the shared secret; throws JwtException if invalid
    public Claims validateAccessToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
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
