import React, { createContext, useContext, useState, useEffect } from 'react';
import User from '../models/User'; // Adjust path as necessary

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from local storage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User data loaded from local storage:", parsedUser);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  // Save user to local storage when it changes
  const setUserInstance = (userInstance) => {
    if (!userInstance) {
      console.error("Cannot set user. Invalid user data:", userInstance);
      return;
    }
    setUser(userInstance);
    localStorage.setItem('user', JSON.stringify(userInstance));
    console.log("User instance set and saved to local storage:", userInstance);
  };

  const getUserInstance = () => user;

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log("User data cleared from context and local storage.");
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserInstance, getUser: getUserInstance, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
