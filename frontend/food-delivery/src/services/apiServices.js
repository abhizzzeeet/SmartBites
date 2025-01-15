import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/v1/auth";

export const login = (userType, credentials) => {
  return axios.post(`${BASE_URL}/${userType}/login`, credentials);
};

export const signup = (userType, userDetails) => {
  return axios.post(`${BASE_URL}/${userType}/signup`, userDetails);
};
