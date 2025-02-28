import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerAuthComponent } from './views/auth/customer-auth/customer-auth.component';
// import { SellerAuthComponent } from './views/auth/seller-auth.component';
// import { DeliveryAgentAuthComponent } from './views/auth/delivery-agent-auth.component';
// import { SellerHomeScreenComponent } from './views/sellers/seller-home-screen.component';
// import { SellerMenuComponent } from './views/sellers/seller-menu.component';
// import { SellerOrdersComponent } from './views/sellers/seller-orders.component';
// import { AddRestaurantComponent } from './views/sellers/add-restaurant.component';
// import { CustomerHomeScreenComponent } from './views/customers/customer-home-screen/customer-home-screen.component';
// import { RestaurantMenuComponent } from './views/customers/restaurant-menu.component';
// import { DeliveryAgentHomeScreenComponent } from './views/delivery-agents/delivery-agent-home-screen.component';

const routes: Routes = [
  { path: 'auth/customer', component: CustomerAuthComponent },
  // { path: 'auth/seller', component: SellerAuthComponent },
  // { path: 'auth/deliveryAgent', component: DeliveryAgentAuthComponent },
  // {
  //   path: 'sellerHomeScreen/:userId',
  //   component: SellerHomeScreenComponent,
  //   children: [
  //     { path: 'menu', component: SellerMenuComponent },
  //     { path: 'menu/addRestaurant', component: AddRestaurantComponent },
  //     { path: 'orders', component: SellerOrdersComponent }
  //   ]
  // },
  // { path: 'customerHomeScreen/:userId', component: CustomerHomeScreenComponent },
  // { path: 'restaurantMenu', component: RestaurantMenuComponent },
  // { path: 'deliveryAgentHomeScreen/:userId', component: DeliveryAgentHomeScreenComponent },
  { path: '', redirectTo: '/auth/customer', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
