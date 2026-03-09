package com.example.fooddelivery.fooddelivery.repositories;

import com.example.fooddelivery.fooddelivery.models.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    // Looks up a token record by its stored SHA-256 hash for validation on refresh/logout
    Optional<RefreshToken> findByTokenHash(String tokenHash);
}
