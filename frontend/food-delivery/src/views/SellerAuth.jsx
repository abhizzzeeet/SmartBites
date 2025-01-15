import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';

function SellerAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>Seller Authentication</h1>
      {isLogin ? (
        <Login userType="SELLER" />
      ) : (
        <SignUp userType="SELLER" />
      )}
      <button onClick={toggleAuthMode}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default SellerAuth;
