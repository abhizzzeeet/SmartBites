import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-customer-orders',
  imports: [],
  templateUrl: './customer-orders.component.html'
})
export class CustomerOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private customerService: CustomerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (!user) {
      this.error = 'User not found.';
      this.loading = false;
      return;
    }
    this.customerService.getOrdersByUserId(user.id).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch orders.';
        this.loading = false;
      }
    });
  }
}
