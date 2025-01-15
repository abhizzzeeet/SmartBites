import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/apiServices';
import User from '../../models/User';
import { useUserContext } from '../../contexts/UserProvider';

function Login({ userType }) {
  const {setUser} = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(userType, { email, password });
      const user = new User(
        response.data.id,
        response.data.name,
        response.data.email,
        response.data.password,
        response.data.userType,
        response.data.createdAt
      );
      
      console.log(`userType : ${user.userType}`);
      if(user.userType !== userType){
        alert(`You logged in ${user.userType} account in ${userType} login screen`);
        return;
      }
      setUser(user);
      if(user.userType === "SELLER")
        navigate(`/sellerHomeScreen/${user.id}`);
      else if(user.userType === "CUSTOMER")
        navigate(`/customerHomeScreen/${user.id}`);
      else if(user.userType === "DELIVERYAGENT")
        navigate(`/deliveryAgentHomeScreen/${user.id}`);
      else {
          console.error("Invalid userType:", user.userType);
          alert("Unexpected user type. Please contact support.");
          return;
      }
      alert(`Login successfull for user: ${user.name}`);
    } catch (error) {
      console.log("Login failed: " + error);
      alert(`Login failed`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{userType} Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
