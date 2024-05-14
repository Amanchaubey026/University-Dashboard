/* eslint-disable react/prop-types */
import { useState, createContext } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const userRes = {
  isAuth: false,
  token: ""
};

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate()
  const [isLoggedIn, setLoggedIn] = useState(userRes);

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await axios.post("https://university-dashboard-f6fd.onrender.com/user/login", {
        email,
        password,
      });
      if (res) {
        setLoggedIn({
          isAuth: true,
          token: res.data.accessToken
        });
        localStorage.setItem("accessToken", res.data.token);
        console.log(res.data);
        if(isLoggedIn.isAuth){
            alert('login Successful !')
           navigate('/studentdashboard')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (formData) => {
    try {
      const response = await axios.post("https://university-dashboard-f6fd.onrender.com/user/signup", formData);
      console.log(response); // Handle successful signup
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("https://university-dashboard-f6fd.onrender.com/user/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setLoggedIn(userRes);
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ handleLogin, handleSignup, handleLogout, isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
