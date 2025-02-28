import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerController from "../../controllers/SellerController";
import Menu from "../../models/Menu";
import Restaurant from "../../models/Restaurant";
import { useUserContext } from "../../contexts/UserProvider";

const SellerOrders = () => {
  const navigate = useNavigate();
  const { getUser } = useUserContext();
  const user = getUser();

  const [restaurants, setRestaurants] = useState([]); // List of restaurants
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Currently selected restaurant
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const fetchedRestaurants = await SellerController.fetchRestaurantByUserId(user.id);
      setRestaurants(fetchedRestaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const fetchOrders = async (restaurantId) => {
    try {
      const fetchedOrders = await SellerController.getOrdersByRestaurantId(restaurantId);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleSelectRestaurant = (event) => {
    const selectedId = event.target.value;
    const restaurant = restaurants.find((rest) => rest.restaurantId.toString() === selectedId);
    setSelectedRestaurant(restaurant);
    fetchOrders(selectedId); // Fetch menu items for the selected restaurant
  };

  

  return (
    <div>
      <h2>Seller Orders</h2>
      <p>See all the orders of restaurants here.</p>

      {/* Select Restaurant Dropdown */}
      <div>
        <select
          onChange={handleSelectRestaurant}
          value={selectedRestaurant?.restaurantId?.toString() || ""}
        >
          <option value="" disabled>
            Select a restaurant
          </option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.restaurantId} value={restaurant.restaurantId.toString()}>
              {restaurant.restaurantName}
            </option>
          ))}
        </select>
      </div>

      {/* Display Menu Items */}
      {selectedRestaurant && (
        <div>
          <h3>Orders for {selectedRestaurant.restaurantName}</h3>
          <table border="1">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>User Name</th>
                        <th>Quantity</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.itemName}</td>
                                <td>{order.userName}</td>
                                <td>{order.quantity}</td>
                                <td>{order.createdAt}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No orders found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      )}

    </div>
  );
};

export default SellerOrders;
