import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserProvider';

const SellerHomeScreen = () => {
  const { getUser } = useUserContext();
  const user = getUser();

  // Ensure that user is defined before rendering the component
  if (!user) {
    console.log("retrieving data");
    return <div>Loading...</div>; // You can show a loading message or redirect here
  }

  return (
    <div>
       <h1>Welcome Seller {user.name || "User"}!</h1>
      <p>Your ID: {user.id}</p>
      {/* Tabs for navigation */}
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <Link
          to={`/sellerHomeScreen/${user.id}/menu`}
          style={{ marginRight: '20px' }}
        >
          Menu
        </Link>
        <Link
          to={`/sellerHomeScreen/${user.id}/orders`}
          style={{ marginRight: '20px' }}
        >
          Orders
        </Link>
      </div>

      {/* This will render the content of the clicked tab */}
      <Outlet />
    </div>
  );
};

export default SellerHomeScreen;
