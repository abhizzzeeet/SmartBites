// Restaurant.js - Data Model

class Restaurant {
    constructor(restaurantId = null, restaurantName, address, city, state, latitude, longitude, pincode, userId) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.latitude = latitude;
        this.longitude = longitude;
        this.pincode = pincode;
        this.userId = userId;
    }
}

export default Restaurant;