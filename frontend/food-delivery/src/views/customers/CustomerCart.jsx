import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/CartSlice";
import Order from '../../models/Order'
import { useUserContext } from "../../contexts/UserProvider";

const CartComponent = () => {
  const {getUser} = useUserContext();
  const user = getUser();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    console.log(`place order clicked`);
    cart.map((item)=> {
      console.log(`item.quantity: ${typeof(item.quantity)}`);
      const orderObj = new Order(
        item.itemId ,
        item.restaurantId,
        item.restaurantName,
        user.id,
        user.name,
        item.itemName,
        item.quantity,
        "cooking",
      );
      fetch('http://localhost:8082/api/orders/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderObj),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Order added successfully!");
                    cart.map((item) => {
                      dispatch(removeFromCart({itemId: item.itemId, restaurantId: item.restaurantId}));
                    });
                } else {
                    alert("Failed to add order.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred.");
            });
    })

  }

  return (
    <div>
      <h2>🛒 Shopping Cart</h2>
      <button onClick={()=> handlePlaceOrder()}>Place Order</button>
      {cart.length === 0 ? <p>Cart is empty.</p> : (
        <ul>
          {cart.map((item) => (
            <li key={item.itemId}>
              {item.itemName} - ${item.basePrice} x {item.quantity}
              <button onClick={() => dispatch(updateQuantity({ itemId: item.itemId, restaurantId: item.restaurantId, quantity: item.quantity + 1 }))}>➕</button>
              <button onClick={() => dispatch(updateQuantity({ itemId: item.itemId, restaurantId: item.restaurantId, quantity: Math.max(1, item.quantity - 1) }))}>➖</button>
              <button onClick={() => dispatch(removeFromCart({ itemId: item.itemId, restaurantId: item.restaurantId }))}>❌ Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartComponent;
