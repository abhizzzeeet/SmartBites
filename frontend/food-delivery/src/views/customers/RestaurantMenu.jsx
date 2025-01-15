import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const RestaurantMenu = () => {

    const location = useLocation();
    const {restaurant} = location.state || {};

    const [menus, setMenus] = useState([]);

    useEffect(() => {
        fetchMenus();
    },[restaurant]);

    const fetchMenus = async () => {
        const response = await fetch(`http://localhost:8081/api/customers/getMenuForRestaurant?restaurantId=${restaurant.id}`, {
            method: "GET",
        });
        if(!response.ok){
            throw new Error("Failed to feetch menu for restaurant");
        }
        const data = await response.json();
        console.log("menus recieved", data);
        setMenus(data);

    }

    return(
        <div>
            <h1>{`restaurant menu for: ${restaurant.restaurantName}`}</h1>
            {menus.length >0 && (
            <ul>{menus.map((menu) => (
                <li>{`${menu.itemName}`}</li>
            ))}          

            </ul>
            )}
        </div>
    );
};
export default RestaurantMenu;