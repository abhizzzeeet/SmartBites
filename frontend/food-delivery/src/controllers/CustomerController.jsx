import Order from "../models/Order";
class CustomerController {


    async placeOrder(order) {
        try {
            const response = await fetch(`http://localhost:8081/api/orders/add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'apllication/json',
                    },
                    body: JSON.stringify(order),
                });

            if (!response.ok) {
                throw new Error(`Error adding order: ${response.statusText}`);
            }


        } catch (e) {
            console.error('Error adding order', e);
        }

    }

    async getOrdersByUserId(user) {
        try {
            const response = await fetch(`http://localhost:8082/api/orders/user/${user.id}`,
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
            console.log(`orders: `,orders);
            
            return orders;

        } catch (e) {
            console.error('Error in fetching orders by userId', e);
            return [];
        }

    }
}
export default new CustomerController();