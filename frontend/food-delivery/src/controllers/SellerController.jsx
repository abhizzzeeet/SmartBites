import Restaurant from "../models/Restaurant";
import axios from "axios";
import Order from "../models/Order";

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

    
    async getOrdersByRestaurantId(restaurantId) {
        try {
            const response = await fetch(`http://localhost:8082/api/orders/restaurant/${restaurantId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'apllication/json',
                    },
                });

            if (!response.ok) {
                throw new Error(`Error fetching orders by userId: ${response.statusText}`);
            }

            const data = await response.json();

            const orders = data.map((item) =>
                new Order(
                    item.itemId,
                    item.restaurantId,
                    item.restaurantName,
                    item.userId,
                    item.userName,
                    item.itemName,
                    item.quantity,
                    item.status,
                    item.createdAt,
                    item.updatedAt,
                )
            );
            
            return orders;

        } catch (e) {
            console.error('Error in fetching orders by userId', e);
            return [];
        }

    }
    
}

export default new SellerController();