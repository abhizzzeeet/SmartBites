import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../services/cart.service';
import { CustomerService } from '../../../services/customer.service';
import { UserService } from '../../../services/user.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-customer-cart',
  imports: [],
  templateUrl: './customer-cart.component.html'
})
export class CustomerCartComponent implements OnInit {
  cart: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private customerService: CustomerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => (this.cart = cart));
  }

  increment(item: CartItem): void {
    this.cartService.updateQuantity(item.itemId, item.restaurantId, item.quantity + 1);
  }

  decrement(item: CartItem): void {
    this.cartService.updateQuantity(item.itemId, item.restaurantId, Math.max(1, item.quantity - 1));
  }

  remove(item: CartItem): void {
    this.cartService.removeFromCart(item.itemId, item.restaurantId);
  }

  handlePlaceOrder(): void {
    const user = this.userService.getUser();
    if (!user) return;

    this.cart.forEach((item) => {
      const orderObj = new Order(
        item.itemId,
        item.restaurantId,
        item.restaurantName,
        user.id,
        user.name,
        item.itemName,
        item.quantity,
        'cooking'
      );
      this.customerService.placeOrder(orderObj).subscribe({
        next: () => {
          alert('Order placed successfully!');
          this.cartService.clearCart();
        },
        error: (err) => {
          console.error('Error placing order:', err);
          alert('Failed to place order.');
        }
      });
    });
  }
}
