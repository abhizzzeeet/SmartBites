package com.example.orders_service.orders_service.repositories;

import com.example.orders_service.orders_service.models.Order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Find orders by userId
    List<Order> findByUserId(Long userId);

    // Find orders by restaurantId
    List<Order> findByRestaurantId(Long restaurantId);
}
