package com.example.restaurants_service.restaurants_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.restaurants_service.restaurants_service.models.Restaurant;
import com.example.restaurants_service.restaurants_service.services.RestaurantsService;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantsController {

    @Autowired
    private RestaurantsService restaurantsService;

    @PostMapping
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
        try {
            // System.out.println("restaurant object passed"+restaurant.getRestaurantName());
            Restaurant savedRestaurant = restaurantsService.saveRestaurant(restaurant);
            return ResponseEntity.ok(savedRestaurant);  // 200 OK response with the saved restaurant
        } catch (Exception e) {
            // Log the exception (optional) and return a bad request or internal server error response
            System.out.println("Error is adding restaurant: "+ e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);  // You can add custom error messages or handle them as needed
        }
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        try {
            List<Restaurant> restaurants = restaurantsService.getAllRestaurants();
            return ResponseEntity.ok(restaurants);  // 200 OK response with the list of restaurants
        } catch (Exception e) {
            // Log the exception and return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);  // You can add custom error messages or handle them as needed
        }
    }

    @GetMapping("/getRestaurantsByUserId/{userId}")
    public ResponseEntity<List<Restaurant>> getRestaurantsByUserId(@PathVariable Long userId) {
        try{
            List<Restaurant> restaurants = restaurantsService.getRestaurantsByUserId(userId);
            return ResponseEntity.ok(restaurants);
        } catch ( Exception e ) {
            System.out.println("Error in fetching restaurants for " + userId + ": " + e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
