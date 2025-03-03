package com.example.restaurants_service.restaurants_service.repositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.restaurants_service.restaurants_service.models.Menu;


import java.util.List;


@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByRestaurantId(Long restaurantId);

    List<Menu> findByItemNameContainingIgnoreCase(String itemName);

    List<Menu> findByRestaurantIdAndItemNameContainingIgnoreCase(Long restaurantId, String query);

    // @Query("SELECT m FROM Menu m LEFT JOIN FETCH m.quantityPrices WHERE m.restaurantId = :restaurantId")
    // List<Menu> findByRestaurantIdWithPrices(@Param("restaurantId") Long restaurantId);

    
}

