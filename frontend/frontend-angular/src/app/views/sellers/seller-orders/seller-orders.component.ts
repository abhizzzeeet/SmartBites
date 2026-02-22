import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../../services/seller.service';
import { UserService } from '../../../services/user.service';
import { Restaurant } from '../../../models/restaurant.model';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-seller-orders',
  imports: [FormsModule],
  templateUrl: './seller-orders.component.html'
})
export class SellerOrdersComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  orders: Order[] = [];

  constructor(
    private sellerService: SellerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    const user = this.userService.getUser();
    if (!user) return;
    this.sellerService.fetchRestaurantByUserId(user.id).subscribe({
      next: (restaurants) => (this.restaurants = restaurants),
      error: (err) => console.error('Error fetching restaurants:', err)
    });
  }

  fetchOrders(restaurantId: number): void {
    this.sellerService.getOrdersByRestaurantId(restaurantId).subscribe({
      next: (orders) => (this.orders = orders),
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  handleSelectRestaurant(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    const restaurant =
      this.restaurants.find(
        (r) => r.restaurantId?.toString() === selectedId
      ) || null;
    this.selectedRestaurant = restaurant;
    if (restaurant?.restaurantId != null)
      this.fetchOrders(restaurant.restaurantId);
  }
}
