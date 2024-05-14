import { useState } from "react";
import axios from "axios";

function LoginAndSignup() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState({}); // State for form errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log(response); // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      setErrors({ ...errors, form: "Invalid credentials" }); // General form error
      console.error(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        formData
      );
      console.log(response); // Handle successful signup
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // Set specific field errors from backend
      } else {
        setErrors({ ...errors, form: "Signup failed" }); // General form error
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <button
            className={`px-4 py-2 rounded-t-md mr-2 focus:outline-none ${
              activeTab === "login" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-t-md focus:outline-none ${
              activeTab === "signup" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        {/* Forms */}
        {activeTab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
            {errors.form && (
              <p className="text-red-500 text-xs italic">{errors.form}</p>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
            {errors.form && (
              <p className="text-red-500 text-xs italic">{errors.form}</p>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginAndSignup;
