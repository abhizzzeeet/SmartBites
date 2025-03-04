package com.example.orders_service.orders_service.services.kafka;


import com.example.orders_service.orders_service.models.Order;
import com.example.orders_service.orders_service.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class KafkaConsumerService {

    @Autowired
    private OrderRepository orderRepository;

    private final List<Order> orderBuffer = new ArrayList<>();

    // Cache for fetching orders in real-time before pushing to DB
    private final ConcurrentHashMap<Long, List<Order>> restaurantOrdersCache = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, List<Order>> userOrdersCache = new ConcurrentHashMap<>();

    @KafkaListener(topics = "orders_topic", groupId = "orders-group")
    public void consumeOrder(Order order) {
        System.out.println("Order received from Kafka: " + order);

        // Add order to the buffer
        orderBuffer.add(order);
        System.out.println("Order Buffer : " + orderBuffer);


        // Store order in memory cache
        restaurantOrdersCache.computeIfAbsent(order.getRestaurantId(), k -> new ArrayList<>()).add(order);
        userOrdersCache.computeIfAbsent(order.getUserId(), k -> new ArrayList<>()).add(order);

        // If 5 unique orders are received, push them to the database
        if (orderBuffer.size() >= 5) {
            pushOrdersToDatabase();
        }
    }

    private void pushOrdersToDatabase() {
        if (!orderBuffer.isEmpty()) {
            orderRepository.saveAll(orderBuffer);
            orderBuffer.clear();
            System.out.println("5 orders pushed to DB.");
        }
    }

    public List<Order> getOrdersByRestaurantFromKafka(Long restaurantId) {
        return restaurantOrdersCache.getOrDefault(restaurantId, new ArrayList<>());
    }

    public List<Order> getOrdersByUserFromKafka(Long userId) {
        return userOrdersCache.getOrDefault(userId, new ArrayList<>());
    }
}
