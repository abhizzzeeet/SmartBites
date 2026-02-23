package com.example.restaurants_service.restaurants_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.restaurants_service.restaurants_service.models.Menu;
import com.example.restaurants_service.restaurants_service.models.Restaurant;
import com.example.restaurants_service.restaurants_service.repositories.MenuRepository;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public Menu addMenu(Menu menu) {
        return menuRepository.save(menu);
    }

    public List<Menu> getAllMenus() {
        return menuRepository.findAll();
    }

    public Menu getMenuByItemId(Long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found with id: " + id));
    }

    public List<Menu> getMenuByRestaurantId(Long restaurantId) {
        String cacheKey = "restaurant" + restaurantId;

        // Try cache first — Redis is optional, fall back to DB if unavailable
        try {
            List<Menu> cached = (List<Menu>) redisTemplate.opsForValue().get(cacheKey);
            if (cached != null) {
                System.out.println("Fetching menu from cache.");
                return cached;
            }
        } catch (Exception e) {
            System.out.println("Redis unavailable, falling back to DB: " + e.getMessage());
        }

        // Fetch from DB
        System.out.println("Fetching menu from DB...");
        List<Menu> menus = menuRepository.findByRestaurantId(restaurantId);

        // Try to populate cache — skip silently if Redis is down
        try {
            redisTemplate.opsForValue().set(cacheKey, menus, 10, TimeUnit.MINUTES);
        } catch (Exception e) {
            System.out.println("Redis unavailable, skipping cache write: " + e.getMessage());
        }

        return menus;
    }

    public Menu updateMenu(Long id, Menu menu) {
        Menu existingMenu = getMenuByItemId(id);
        existingMenu.setRestaurantId(menu.getRestaurantId());
        existingMenu.setItemName(menu.getItemName());
        existingMenu.setBasePrice(menu.getBasePrice());
        existingMenu.setQuantityType(menu.getQuantityType());
        // existingMenu.setQuantityPrices(menu.getQuantityPrices());
        existingMenu.setDescription(menu.getDescription());
        existingMenu.setAvailability(menu.getAvailability());
        existingMenu.setCategory(menu.getCategory());
        return menuRepository.save(existingMenu);
    }

    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }
}
