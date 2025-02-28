
class Order {
    constructor(
        itemId = null,
        restaurantId = null,
        restaurantName = "",
        userId = null,
        userName = "",
        itemName = "",
        quantity = null,
        status = "",
        createdAt ,
        updatedAt
    ) {
        this.itemId = itemId;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.userId = userId;
        this.userName = userName;
        this.itemName = itemName;
        this.quantity = quantity;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}

export default Order;
