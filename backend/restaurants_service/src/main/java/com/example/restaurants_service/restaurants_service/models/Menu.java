    package com.example.restaurants_service.restaurants_service.models;

    import jakarta.persistence.*;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import lombok.AllArgsConstructor;
    import java.util.Map;

    @Entity
    @Table(name = "menu")
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Menu {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long itemId;

        @Column(nullable = false)
        private Long restaurantId;

        @Column(nullable = false)
        private String itemName;

        @Column(nullable = false)
        private Double basePrice;

        @Column(nullable = false)
        private String quantityType; // e.g., "portion", "size", "piece"

        @ElementCollection
        @CollectionTable(name = "menu_quantity_prices", joinColumns = @JoinColumn(name = "item_id"))
        @MapKeyColumn(name = "quantity_option")
        @Column(name = "price")
        private Map<String, Double> quantityPrices; // {"half": 100.0, "full": 180.0, "quarter": 60.0}

        @Column
        private String description;

        @Column(nullable = false)
        private Boolean availability;

        @Column
        private String category;
    }
