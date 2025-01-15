package com.example.restaurants_service.restaurants_service.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.restaurants_service.restaurants_service.models.Menu;
import com.example.restaurants_service.restaurants_service.services.MenuService;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
@CrossOrigin(origins = "*") // Enable CORS for all origins (update as needed)
public class MenuController {

    @Autowired
    private MenuService menuService;

    @PostMapping
    public Menu addMenu(@RequestBody Menu menu) {
        return menuService.addMenu(menu);
    }

    @GetMapping
    public List<Menu> getAllMenus() {
        return menuService.getAllMenus();
    }

    @GetMapping("/{id}")
    public Menu getMenuById(@PathVariable Long id) {
        return menuService.getMenuByItemId(id);
    }

    @GetMapping("/getMenusByRestaurantId/{id}")
    public List<Menu> getMenusByRestaurantId(@PathVariable Long id) {
        return menuService.getMenuByRestaurantId(id);
    }

    @PutMapping("/{id}")
    public Menu updateMenu(@PathVariable Long id, @RequestBody Menu menu) {
        return menuService.updateMenu(id, menu);
    } 

    @DeleteMapping("/{id}")
    public void deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
    }
}
