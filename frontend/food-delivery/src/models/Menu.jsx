// Menu.jsx

class Menu {
    constructor(
      itemId = null,
      restaurantId = null,
      itemName = "",
      basePrice = 0.0,
      quantityType = "",
      quantityPrices = {},
      description = "",
      availability = true,
      category = ""
    ) {
      this.itemId = itemId;
      this.restaurantId = restaurantId;
      this.itemName = itemName;
      this.basePrice = basePrice;
      this.quantityType = quantityType;
      this.quantityPrices = quantityPrices;
      this.description = description;
      this.availability = availability;
      this.category = category;
    }
  }
  
  export default Menu;
  