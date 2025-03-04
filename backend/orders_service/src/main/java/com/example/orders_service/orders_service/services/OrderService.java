package com.example.orders_service.orders_service.services;


import com.example.orders_service.orders_service.models.Order;
import com.example.orders_service.orders_service.repositories.OrderRepository;
import com.example.orders_service.orders_service.services.kafka.KafkaConsumerService;

import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private KafkaConsumerService kafkaConsumerService;

    // Add an order
    // public Order addOrder(Order order) {
    //     try{
    //         return orderRepository.save(order);
    //     } catch(Error e) {
    //         System.out.println("Error occured in adding order : "+e);
    //         throw e;
    //     }
        
    // }

    // Delete an order by ID
    public String deleteOrder(Long orderId) {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            orderRepository.deleteById(orderId);
            return "Order deleted successfully!";
        } else {
            return "Order not found!";
        }
    }

    // Get all orders (Optional)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get orders by userId
    public List<Order> getOrdersByUserId(Long userId) {
        List<Order> dbOrders = orderRepository.findByUserId(userId);
        List<Order> kafkaOrders = kafkaConsumerService.getOrdersByUserFromKafka(userId);

        List<Order> allOrders = new ArrayList<>(kafkaOrders);
        allOrders.addAll(dbOrders);
        return allOrders;
        // return orderRepository.findByUserId(userId);
    }

    // Get orders by restaurantId
    public List<Order> getOrdersByRestaurantId(Long restaurantId) {
        List<Order> dbOrders = orderRepository.findByRestaurantId(restaurantId);
        List<Order> kafkaOrders = kafkaConsumerService.getOrdersByRestaurantFromKafka(restaurantId);

        List<Order> allOrders = new ArrayList<>(kafkaOrders);
        allOrders.addAll(dbOrders);
        return allOrders;
        // return orderRepository.findByRestaurantId(restaurantId);
    }
}
