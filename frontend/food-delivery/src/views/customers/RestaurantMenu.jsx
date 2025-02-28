import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {addToCart} from '../../redux/CartSlice';
const RestaurantMenu = () => {

    const location = useLocation();
    const {restaurant} = location.state || {};

    const [menus, setMenus] = useState([]);

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchMenus();
    },[restaurant]);

    const fetchMenus = async () => {
        const response = await fetch(`http://localhost:8081/api/customers/getMenuForRestaurant?restaurantId=${restaurant.id}`, {
            method: "GET",
        });
        if(!response.ok){
            throw new Error("Failed to fetch menu for restaurant");
        }
        const data = await response.json();
        console.log("menus recieved", data);
        setMenus(data);

    }

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        console.log(`cart items`);
       
    }
    useEffect(() => {
        console.log("Cart items updated:");
        cart.forEach((item) => console.log("Item:", item));
    }, [cart]);

    return(
        <div>
            <h1>{`restaurant menu for: ${restaurant.restaurantName}`}</h1>
            {menus.length >0 && (
            <ul>{menus.map((menu) => (
                <li>
                    {`${menu.itemName}`}
                    
                    <button onClick={() => {handleAddToCart(menu)}}>Add to Cart</button>
                </li>
            ))}          

            </ul>
            )}
        </div>
    );
};
export default RestaurantMenu;