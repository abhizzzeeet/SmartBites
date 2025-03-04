package com.example.orders_service.orders_service.configs;


import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaAdminConfig {

    private static final String TOPIC_NAME = "orders_topic";

    // Kafka Admin Bean to manage topics
    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        return new KafkaAdmin(configs);
    }

    // Creating the orders_topic if it doesn't exist
    @Bean
    public NewTopic ordersTopic() {
        return new NewTopic(TOPIC_NAME, 3, (short) 1);
    }
}
