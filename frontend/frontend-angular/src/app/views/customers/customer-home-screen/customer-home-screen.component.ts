import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-customer-home-screen',
  imports: [FormsModule],
  templateUrl: './customer-home-screen.component.html'
})
export class CustomerHomeScreenComponent implements OnInit {
  userId: string = '';
  query: string = '';
  results: any[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    this.handleSearch();
  }

  get user() {
    return this.userService.getUser();
  }

  handleSearch(): void {
    this.error = '';
    this.customerService.searchRestaurants(this.query).subscribe({
      next: (data) => (this.results = data),
      error: (err) => (this.error = err.message)
    });
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.handleSearch();
  }

  handleRestaurantClick(restaurant: any): void {
    this.router.navigate(['/restaurantMenu'], { state: { restaurant } });
  }

  goToCart(): void {
    this.router.navigate(['/customerHomeScreen/cart']);
  }

  goToOrders(): void {
    this.router.navigate(['/customerHomeScreen/orders']);
  }
}
