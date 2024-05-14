/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

function LoginAndSignup() {
  const { handleLogin, handleSignup } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    stream: "",
    subject: "",
  });
  const [errors, setErrors] = useState({});
  const [streams, setStreams] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchStreams();
    fetchSubjects();
  }, []);

  const fetchStreams = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("https://university-dashboard-f6fd.onrender.com/user/streams/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStreams(response.data);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("https://university-dashboard-f6fd.onrender.com/user/subjects/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email: formData.email, password: formData.password });
    } catch (error) {
      setErrors({ ...errors, form: "Invalid credentials" });
      console.error(error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSignup(formData);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        setErrors({ ...errors, form: "Signup failed" });
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

        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit}>
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
          <form onSubmit={handleSignupSubmit}>
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
            <div className="mb-4">
              <label htmlFor="stream">Stream</label>
              <select
                id="stream"
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Stream</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                {streams.map((stream) => (
                  <option key={stream._id} value={stream._id}>{stream.name}</option>
                ))}
              </select>
              {errors.stream && (
                <p className="text-red-500 text-xs italic">{errors.stream}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Subject</option>
                <option value="Maths">Maths</option>
                <option value="Biology">Biology</option>
                <option value="Computer Science">Computer Science</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>{subject.name}</option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-red-500 text-xs italic">{errors.subject}</p>
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
