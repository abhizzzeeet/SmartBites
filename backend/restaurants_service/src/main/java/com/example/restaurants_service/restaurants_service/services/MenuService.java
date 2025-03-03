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
        try {
            String cacheKey = "restaurant" + restaurantId;

            List<Menu> menus = (List<Menu>) redisTemplate.opsForValue().get(cacheKey);
            if (menus == null) {
                System.out.println("Fetching menu from db");
                menus = menuRepository.findByRestaurantId(restaurantId);
                // if (menus.isEmpty()) {
                // throw new RuntimeException("Menu not found with restaurant Id: " +
                // restaurantId);
                // }
                // Store the result in Redis cache for 10 minutes
                redisTemplate.opsForValue().set(cacheKey, menus, 10, TimeUnit.MINUTES);
            } else {
                System.out.println("Fetching menu from cache");
            }

            return menus;
        } catch (Exception e) {
            System.out.println("Error in fetching menu: " + e);
            throw e;
        }

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
