import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SellerService } from '../../../services/seller.service';
import { UserService } from '../../../services/user.service';
import { Restaurant } from '../../../models/restaurant.model';
import { Menu } from '../../../models/menu.model';

@Component({
  selector: 'app-seller-menu',
  imports: [FormsModule],
  templateUrl: './seller-menu.component.html'
})
export class SellerMenuComponent implements OnInit {
  restaurants: Restaurant[] = [];
  selectedRestaurant: Restaurant | null = null;
  menuItems: Menu[] = [];
  newMenuItem: Menu = new Menu();

  constructor(
    private sellerService: SellerService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
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

  fetchMenuItems(restaurantId: number): void {
    this.sellerService.fetchMenuByRestaurantId(restaurantId).subscribe({
      next: (items) => (this.menuItems = items),
      error: (err) => console.error('Error fetching menu items:', err)
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
      this.fetchMenuItems(restaurant.restaurantId);
  }

  handleAddMenuItem(): void {
    if (!this.selectedRestaurant) return;
    const updated = {
      ...this.newMenuItem,
      restaurantId: this.selectedRestaurant.restaurantId,
      restaurantName: this.selectedRestaurant.restaurantName
    };
    this.sellerService.addMenuItem(updated).subscribe({
      next: () => {
        this.menuItems = [...this.menuItems, updated];
        this.newMenuItem = new Menu();
      },
      error: (err) => console.error('Error adding menu item:', err)
    });
  }

  navigateToAddRestaurant(): void {
    this.router.navigate(['addRestaurant'], { relativeTo: this.route });
  }
}
