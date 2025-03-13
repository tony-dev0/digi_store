import axios from "axios";

const API_URL = "/api/auth/";

export const register = (firstname: string, lastname: string, email: string, phone: string, password: string) => {
  return axios.post(API_URL + "register", {
    firstname,
    lastname,
    email,
    phone,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
