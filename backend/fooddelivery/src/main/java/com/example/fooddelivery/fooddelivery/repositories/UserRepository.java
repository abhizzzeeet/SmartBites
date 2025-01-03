package com.example.fooddelivery.fooddelivery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.fooddelivery.fooddelivery.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
