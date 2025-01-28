package com.example.restaurants_service.restaurants_service.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restaurants_service.restaurants_service.models.Menu;
import com.example.restaurants_service.restaurants_service.models.Restaurant;
import com.example.restaurants_service.restaurants_service.repositories.MenuRepository;
import com.example.restaurants_service.restaurants_service.repositories.RestaurantsRepository;

@Service
public class CustomerService {
    

    @Autowired 
    private MenuService menuService;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private RestaurantsRepository restaurantsRepository;

    @Autowired
    private RestaurantsService restaurantsService;

    public List<Restaurant> getSearchQueryResult(String query, double latitude, double longitude) {
        List<Restaurant> results = new ArrayList<>();
        List<Restaurant> searchResult = new ArrayList<>();
        // Fetch menu items whose itemName contains the query
        List<Menu> menuItems = menuRepository.findByItemNameContainingIgnoreCase(query);
        List<Restaurant> restaurants= restaurantsService.getAllRestaurants();
        
        for(Restaurant restaurant: restaurants) {
            if (restaurant != null) {
                // Calculate the distance between restaurant and passed coordinates
                double distance = calculateDistance(latitude, longitude, restaurant.getLatitude(), restaurant.getLongitude());

                // If distance is within 5 km, add to results
                if (distance <= 100.0) {
                    results.add(restaurant);
                }
            }
        }
        
        for( Restaurant restaurant: results) {
            List<Menu> menus = menuRepository.findByRestaurantIdAndItemNameContainingIgnoreCase(restaurant.getId(), query);
            if(menus.size() > 0){
                searchResult.add(restaurant);
            }        
        }
        return searchResult;
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int EARTH_RADIUS = 6371; // Earth radius in kilometers

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }
}
