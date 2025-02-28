import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerController from "../../controllers/SellerController";
import Menu from "../../models/Menu";
import Restaurant from "../../models/Restaurant";
import { useUserContext } from "../../contexts/UserProvider";

const SellerMenu = () => {
  const navigate = useNavigate();
  const { getUser } = useUserContext();
  const user = getUser();

  const [restaurants, setRestaurants] = useState([]); // List of restaurants
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Currently selected restaurant
  const [menuItems, setMenuItems] = useState([]); // Menu items of the selected restaurant
  const [newMenuItem, setNewMenuItem] = useState(new Menu()); // Form data for a new menu item

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

  const fetchMenuItems = async (restaurantId) => {
    try {
      const fetchedMenuItems = await SellerController.fetchMenuByRestaurantId(restaurantId);
      setMenuItems(fetchedMenuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleSelectRestaurant = (event) => {
    const selectedId = event.target.value;
    const restaurant = restaurants.find((rest) => rest.restaurantId.toString() === selectedId);
    setSelectedRestaurant(restaurant);
    fetchMenuItems(selectedId); // Fetch menu items for the selected restaurant
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleAddMenuItem = async (event) => {
    event.preventDefault();
    try {
      const updatedMenuItem = {
        ...newMenuItem,
        restaurantId: selectedRestaurant.restaurantId, 
        restaurantName: selectedRestaurant.restaurantName, 
      };
      await SellerController.addMenuItem(updatedMenuItem);
      setMenuItems([...menuItems, updatedMenuItem]); // Update menu items list
      setNewMenuItem(new Menu(selectedRestaurant.restaurantId)); // Reset form
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  return (
    <div>
      <h2>Seller Menu</h2>
      <p>Manage your menu items here.</p>
      <button onClick={() => navigate("addRestaurant")}>Add Restaurant</button>

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
          <h3>Menu for {selectedRestaurant.restaurantName}</h3>
          {menuItems.length === 0 ? (
            <p>No menu items found.</p>
          ) : (
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Base Price</th>
                  <th>Quantity Type</th>
                  <th>Description</th>
                  <th>Availability</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.itemId}>
                    <td>{item.itemName}</td>
                    <td>₹{item.basePrice}</td>
                    <td>{item.quantityType}</td>
                    <td>{item.description || "N/A"}</td>
                    <td>{item.availability ? "Available" : "Unavailable"}</td>
                    <td>{item.category || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Add New Menu Item Form */}
      {selectedRestaurant && (
        <div>
          <h3>Add New Menu Item</h3>
          <form onSubmit={handleAddMenuItem}>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={newMenuItem.itemName}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="basePrice"
              placeholder="Base Price"
              value={newMenuItem.basePrice}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="quantityType"
              placeholder="Quantity Type"
              value={newMenuItem.quantityType}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newMenuItem.description}
              onChange={handleInputChange}
            />
            <select
              name="availability"
              value={newMenuItem.availability}
              onChange={(e) =>
                setNewMenuItem({ ...newMenuItem, availability: e.target.value === "true" })
              }
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newMenuItem.category}
              onChange={handleInputChange}
            />
            <button type="submit">Add Menu Item</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellerMenu;
