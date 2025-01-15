package com.example.restaurants_service.restaurants_service.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.restaurants_service.restaurants_service.models.Menu;
import com.example.restaurants_service.restaurants_service.repositories.MenuRepository;

import java.util.List;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

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
        List<Menu> menus =  menuRepository.findByRestaurantId(restaurantId);
        if (menus.isEmpty()) {
            throw new RuntimeException("Menu not found with restaurant Id: " + restaurantId);
        }
        return menus;
    }

    public Menu updateMenu(Long id, Menu menu) {
        Menu existingMenu = getMenuByItemId(id);
        existingMenu.setRestaurantId(menu.getRestaurantId());
        existingMenu.setItemName(menu.getItemName());
        existingMenu.setBasePrice(menu.getBasePrice());
        existingMenu.setQuantityType(menu.getQuantityType());
        existingMenu.setQuantityPrices(menu.getQuantityPrices());
        existingMenu.setDescription(menu.getDescription());
        existingMenu.setAvailability(menu.getAvailability());
        existingMenu.setCategory(menu.getCategory());
        return menuRepository.save(existingMenu);
    }

    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }
}
