import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';

function CustomerAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>Customer Authentication</h1>
      {isLogin ? (
        <Login userType="CUSTOMER" />
      ) : (
        <SignUp userType="CUSTOMER" />
      )}
      <button onClick={toggleAuthMode}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default CustomerAuth;
