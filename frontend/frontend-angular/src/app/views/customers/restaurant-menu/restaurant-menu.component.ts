import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-restaurant-menu',
  imports: [],
  templateUrl: './restaurant-menu.component.html'
})
export class RestaurantMenuComponent implements OnInit {
  restaurant: any = null;
  menus: any[] = [];

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private cartService: CartService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.restaurant = nav?.extras.state?.['restaurant'] || window.history.state?.restaurant || null;
  }

  ngOnInit(): void {
    if (this.restaurant) {
      this.fetchMenus();
    }
  }

  fetchMenus(): void {
    this.customerService.getMenuForRestaurant(this.restaurant.id).subscribe({
      next: (data) => (this.menus = data),
      error: (err) => console.error('Failed to fetch menu:', err)
    });
  }

  handleAddToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
