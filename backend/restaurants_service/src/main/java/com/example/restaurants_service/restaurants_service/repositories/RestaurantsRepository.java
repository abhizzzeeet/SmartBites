package com.example.restaurants_service.restaurants_service.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.restaurants_service.restaurants_service.models.Restaurant;

public interface RestaurantsRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByUserId(Long userId);
}
