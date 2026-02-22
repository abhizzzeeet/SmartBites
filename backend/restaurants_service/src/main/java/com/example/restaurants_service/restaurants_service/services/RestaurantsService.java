package com.example.restaurants_service.restaurants_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.restaurants_service.restaurants_service.models.Menu;
import com.example.restaurants_service.restaurants_service.models.Restaurant;
import com.example.restaurants_service.restaurants_service.repositories.RestaurantsRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class RestaurantsService {

    @Autowired
    private RestaurantsRepository restaurantsRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantsRepository.save(restaurant);
    }

    // public List<Restaurant> getAllRestaurants() {
    //     try {
    //         String cacheKey = "allRestaurants";
    //         List<Restaurant> restaurants;
    //         // List<Restaurant> restaurants = (List<Restaurant>)redisTemplate.opsForValue().get(cacheKey);
    //         Object cachedData = redisTemplate.opsForValue().get(cacheKey);
    //         if (cachedData == null) {
    //             System.out.println("Fetching all restaurants from db");
    //             restaurants = restaurantsRepository.findAll();
    //             System.out.println("Fetched restaurants from db: " + restaurants);
    //             // if (menus.isEmpty()) {
    //             // throw new RuntimeException("Menu not found with restaurant Id: " +
    //             // restaurantId);
    //             // }
    //             // Store the result in Redis cache for 10 minutes
    //             redisTemplate.opsForValue().set(cacheKey, restaurants, 10, TimeUnit.MINUTES);
    //         } else {
    //             ObjectMapper objectMapper = new ObjectMapper();
    //             objectMapper.registerModule(new JavaTimeModule()); // To support LocalDateTime

    //             restaurants = objectMapper.convertValue(cachedData,
    //                     new TypeReference<List<Restaurant>>() {
    //                     });
    //             System.out.println("Fetched restaurants from cache: " + restaurants);
    //             System.out.println("Fetching all restaurants from cache");
    //         }

    //         return restaurants;
    //     } catch (Exception e) {
    //         System.out.println("Error in fetching all restaurants: " + e);
    //         throw e;
    //     }

    // }

    public List<Restaurant> getAllRestaurants() {
        try {
            String cacheKey = "allRestaurants";
            
            // Try fetching from Redis cache
            List<Restaurant> restaurants = (List<Restaurant>) redisTemplate.opsForValue().get(cacheKey);
            
            if (restaurants == null) {
                System.out.println("Fetching all restaurants from DB...");
                
                restaurants = restaurantsRepository.findAll();
                System.out.println("Fetched from DB: " + restaurants);
                
                // Store result in Redis (even empty list to avoid unnecessary DB calls)
                redisTemplate.opsForValue().set(cacheKey, restaurants, 10, TimeUnit.MINUTES);
            } else {
                System.out.println("Fetched from cache: " + restaurants);
            }
            
            return restaurants;
        } catch (Exception e) {
            System.out.println("Error fetching restaurants: " + e);
            throw e;
        }
    }

    public List<Restaurant> getRestaurantsByUserId(Long userId) {
        return restaurantsRepository.findByUserId(userId);
    }
}
