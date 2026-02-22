import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  itemId: number;
  restaurantId: number;
  restaurantName: string;
  itemName: string;
  basePrice: number;
  quantity: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  get cart(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(item: any): void {
    const current = [...this.cart];
    const existing = current.find(
      (i) => i.itemId === item.itemId && i.restaurantId === item.restaurantId
    );
    if (existing) {
      existing.quantity += 1;
      this.cartSubject.next(current);
    } else {
      this.cartSubject.next([...current, { ...item, quantity: 1 }]);
    }
  }

  removeFromCart(itemId: number, restaurantId: number): void {
    this.cartSubject.next(
      this.cart.filter(
        (i) => !(i.itemId === itemId && i.restaurantId === restaurantId)
      )
    );
  }

  updateQuantity(itemId: number, restaurantId: number, quantity: number): void {
    const current = [...this.cart];
    const item = current.find(
      (i) => i.itemId === itemId && i.restaurantId === restaurantId
    );
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next(current);
    }
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }
}
