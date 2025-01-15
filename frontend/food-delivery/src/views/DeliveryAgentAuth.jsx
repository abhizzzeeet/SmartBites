import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';

function DeliveryAgentAuth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h1>Delivery Agent Authentication</h1>
      {isLogin ? (
        <Login userType="DELIVERYAGENT" />
      ) : (
        <SignUp userType="DELIVERYAGENT" />
      )}
      <button onClick={toggleAuthMode}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
}

export default DeliveryAgentAuth;
