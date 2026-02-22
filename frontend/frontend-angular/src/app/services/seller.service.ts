import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurant } from '../models/restaurant.model';
import { Menu } from '../models/menu.model';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class SellerService {
  constructor(private http: HttpClient) {}

  fetchRestaurantByUserId(userId: number): Observable<Restaurant[]> {
    return this.http
      .get<any[]>(
        `http://localhost:8081/api/restaurants/getRestaurantsByUserId/${userId}`
      )
      .pipe(
        map((data) =>
          data.map(
            (item) =>
              new Restaurant(
                item.id,
                item.restaurantName,
                item.address,
                item.city,
                item.state,
                item.latitude,
                item.longitude,
                item.pincode,
                item.userId
              )
          )
        )
      );
  }

  fetchMenuByRestaurantId(restaurantId: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(
      `http://localhost:8081/api/menus/getMenusByRestaurantId/${restaurantId}`
    );
  }

  addMenuItem(menuItem: any): Observable<any> {
    return this.http.post(`http://localhost:8081/api/menus`, menuItem);
  }

  getOrdersByRestaurantId(restaurantId: number): Observable<Order[]> {
    return this.http
      .get<any[]>(
        `http://localhost:8082/api/orders/restaurant/${restaurantId}`
      )
      .pipe(
        map((data) =>
          data.map(
            (item) =>
              new Order(
                item.itemId,
                item.restaurantId,
                item.restaurantName,
                item.userId,
                item.userName,
                item.itemName,
                item.quantity,
                item.status,
                item.createdAt,
                item.updatedAt
              )
          )
        )
      );
  }
}
