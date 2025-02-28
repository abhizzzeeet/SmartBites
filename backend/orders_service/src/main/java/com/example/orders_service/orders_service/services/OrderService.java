package com.example.orders_service.orders_service.services;


import com.example.orders_service.orders_service.models.Order;
import com.example.orders_service.orders_service.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Add an order
    public Order addOrder(Order order) {
        try{
            return orderRepository.save(order);
        } catch(Error e) {
            System.out.println("Error occured in adding order : "+e);
            throw e;
        }
        
    }

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
        return orderRepository.findByUserId(userId);
    }

    // Get orders by restaurantId
    public List<Order> getOrdersByRestaurantId(Long restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId);
    }
}
