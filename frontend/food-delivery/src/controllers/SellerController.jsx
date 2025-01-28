import React from "react";
import Restaurant from "../models/Restaurant";
import axios from "axios";

class SellerController {

    async fetchRestaurantByUserId(userId) {
        try {
            const response = await fetch(`http://localhost:8081/api/restaurants/getRestaurantsByUserId/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'apllication/json',
                    },
                });

            if (!response.ok) {
                throw new Error(`Error fetching restaurnts by userId: ${response.statusText}`);
            }

            const data = await response.json();

            const restaurants = data.map((item) =>
                new Restaurant(
                    item.id,
                    item.restaurantName,
                    item.address,
                    item.city,
                    item.state,
                    item.latitude,
                    item.longitude,
                    item.pincode,
                    item.userId
                )
            );
            console.log(`restaurants size: ${restaurants.length}`);
            console.log(`restaurant fetched controller: ${restaurants[1].restaurantId}`);
            return restaurants;

        } catch (e) {
            console.error('Error in fetching restaurants by userId', e );
            return [];
        }


    }

    
    
    async fetchMenuByRestaurantId(restaurantId) {
        const response = await axios.get(`http://localhost:8081/api/menus/getMenusByRestaurantId/${restaurantId}`);
        console.log(`Response for fetchMenuByRestaurantId: `, response);
        return response.data;
    }
    
    async addMenuItem(menuItem) {
        const response = await axios.post(`http://localhost:8081/api/menus`, menuItem);
        return response.data;
    }
    
}

export default new SellerController();