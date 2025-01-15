package com.example.restaurants_service.restaurants_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restaurants_service.restaurants_service.models.Restaurant;
import com.example.restaurants_service.restaurants_service.repositories.RestaurantsRepository;

import java.util.List;

@Service
public class RestaurantsService {

    @Autowired
    private RestaurantsRepository restaurantsRepository;

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantsRepository.save(restaurant);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantsRepository.findAll();
    }

    public List<Restaurant> getRestaurantsByUserId(Long userId) {
        return restaurantsRepository.findByUserId(userId);
    }
}
