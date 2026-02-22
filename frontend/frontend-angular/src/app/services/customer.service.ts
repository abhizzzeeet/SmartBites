import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient) {}

  searchRestaurants(query: string): Observable<any[]> {
    if (!query) {
      return this.http.get<any[]>(`http://localhost:8081/api/restaurants`);
    }
    return this.http.get<any[]>(
      `http://localhost:8081/api/customers/search?query=${encodeURIComponent(query)}&latitude=26.692284424260034&longitude=88.3774020141318`
    );
  }

  getMenuForRestaurant(restaurantId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8081/api/customers/getMenuForRestaurant?restaurantId=${restaurantId}`
    );
  }

  placeOrder(order: any): Observable<any> {
    return this.http.post(`http://localhost:8082/api/orders/add`, order);
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http
      .get<any[]>(`http://localhost:8082/api/orders/user/${userId}`)
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
