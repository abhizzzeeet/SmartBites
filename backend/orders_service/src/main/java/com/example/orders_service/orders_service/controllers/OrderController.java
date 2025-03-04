package com.example.orders_service.orders_service.controllers;

import com.example.orders_service.orders_service.models.Order;
import com.example.orders_service.orders_service.services.OrderService;
import com.example.orders_service.orders_service.services.kafka.KafkaProducerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    // Add an order (POST)
    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) {
        kafkaProducerService.sendOrder(order);
        return ResponseEntity.ok(order);
        // Order newOrder = orderService.addOrder(order);
        // return ResponseEntity.ok(newOrder);
    }

    // Delete an order (DELETE)
    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        String response = orderService.deleteOrder(orderId);
        return ResponseEntity.ok(response);
    }

    // Get all orders (GET)
    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // Get orders by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    // Get orders by restaurantId
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Order>> getOrdersByRestaurantId(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(orderService.getOrdersByRestaurantId(restaurantId));
    }
}

