import { Routes } from '@angular/router';
import { CustomerAuthComponent } from './views/auth/customer-auth/customer-auth.component';
import { SellerAuthComponent } from './views/auth/seller-auth/seller-auth.component';
import { DeliveryAgentAuthComponent } from './views/auth/delivery-agent-auth/delivery-agent-auth.component';
import { SellerHomeScreenComponent } from './views/sellers/seller-home-screen/seller-home-screen.component';
import { SellerMenuComponent } from './views/sellers/seller-menu/seller-menu.component';
import { AddRestaurantComponent } from './views/sellers/add-restaurant/add-restaurant.component';
import { SellerOrdersComponent } from './views/sellers/seller-orders/seller-orders.component';
import { CustomerHomeScreenComponent } from './views/customers/customer-home-screen/customer-home-screen.component';
import { CustomerCartComponent } from './views/customers/customer-cart/customer-cart.component';
import { CustomerOrdersComponent } from './views/customers/customer-orders/customer-orders.component';
import { RestaurantMenuComponent } from './views/customers/restaurant-menu/restaurant-menu.component';
import { DeliveryAgentHomeScreenComponent } from './views/delivery-agents/delivery-agent-home-screen/delivery-agent-home-screen.component';

export const routes: Routes = [
  { path: 'auth/customer', component: CustomerAuthComponent },
  { path: 'auth/seller', component: SellerAuthComponent },
  { path: 'auth/deliveryAgent', component: DeliveryAgentAuthComponent },
  {
    path: 'sellerHomeScreen/:userId',
    component: SellerHomeScreenComponent,
    children: [
      { path: 'menu', component: SellerMenuComponent },
      { path: 'menu/addRestaurant', component: AddRestaurantComponent },
      { path: 'orders', component: SellerOrdersComponent }
    ]
  },
  { path: 'customerHomeScreen/cart', component: CustomerCartComponent },
  { path: 'customerHomeScreen/orders', component: CustomerOrdersComponent },
  { path: 'customerHomeScreen/:userId', component: CustomerHomeScreenComponent },
  { path: 'restaurantMenu', component: RestaurantMenuComponent },
  { path: 'deliveryAgentHomeScreen/:userId', component: DeliveryAgentHomeScreenComponent },
  { path: '', redirectTo: '/auth/customer', pathMatch: 'full' }
];
