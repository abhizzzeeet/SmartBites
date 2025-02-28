

import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserProvider";
import CustomerController from "../../controllers/CustomerController";

const CustomerOrders = () => {
    const {getUser} = useUserContext();
    const user = getUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderList = await CustomerController.getOrdersByUserId(user);
                setOrders(orderList);
            } catch (err) {
                setError("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Orders</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Restaurant</th>
                        <th>Quantity</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.itemName}</td>
                                <td>{order.restaurantName}</td>
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
    );
};

export default CustomerOrders;
