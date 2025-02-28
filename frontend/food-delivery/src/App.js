import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerAuth from './views/CustomerAuth';
import SellerAuth from './views/SellerAuth';
import DeliveryAgentAuth from './views/DeliveryAgentAuth';
import SellerHomeScreen from './views/sellers/SellerHomeScreen';
import CustomerHomeScreen from './views/customers/CustomerHomeScreen';
import DeliveryAgentHomeScreen from './views/delivery_agents/DeliveryAgentHomeScreen';
import SellerMenu from './views/sellers/SellerMenu';
import SellerOrders from './views/sellers/SellerOrders';
import { UserProvider } from './contexts/UserProvider';
import AddRestaurant from './views/sellers/AddRestaurant';
import RestaurantMenu from './views/customers/RestaurantMenu';
import CustomerCart from './views/customers/CustomerCart';
import CustomerOrders from './views/customers/CustomerOrders';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/auth/customer" element={<CustomerAuth />} />
          <Route path="/auth/seller" element={<SellerAuth />} />
          <Route path="/auth/deliveryAgent" element={<DeliveryAgentAuth />} />
          <Route path="/sellerHomeScreen/:userId" element={<SellerHomeScreen />} >
            <Route path="menu" element={<SellerMenu />} />
            <Route path="menu/addRestaurant" element={<AddRestaurant /> } />
            <Route path="orders" element={<SellerOrders />} />
          </Route>
          <Route path="/customerHomeScreen/:userId" element={<CustomerHomeScreen />}>
          </Route>
          <Route path="customerHomeScreen/cart" element={<CustomerCart />}></Route>
          <Route path="customerHomeScreen/orders" element={<CustomerOrders />}></Route>
          <Route path="/restaurantMenu" element={<RestaurantMenu />} />        
          <Route path="/deliveryAgentHomeScreen/:userId" element={<DeliveryAgentHomeScreen />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
