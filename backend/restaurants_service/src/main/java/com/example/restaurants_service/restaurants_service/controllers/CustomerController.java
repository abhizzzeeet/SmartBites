package com.example.restaurants_service.restaurants_service.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.restaurants_service.restaurants_service.models.Menu;
import com.example.restaurants_service.restaurants_service.models.Restaurant;
import com.example.restaurants_service.restaurants_service.services.CustomerService;
import com.example.restaurants_service.restaurants_service.services.MenuService;




@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private MenuService menuService;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> postMethodName(
        @RequestParam String query,
        @RequestParam Double latitude,
        @RequestParam Double longitude) {
        //TODO: process POST request
        
        return ResponseEntity.ok(customerService.getSearchQueryResult(query,latitude, longitude));
    }
    
    @GetMapping("/getMenuForRestaurant")
    public ResponseEntity<List<Menu>> getMenuForRestaurant(@RequestParam Long restaurantId) {
        return ResponseEntity.ok(menuService.getMenuByRestaurantId(restaurantId));
    }
    
    
}
