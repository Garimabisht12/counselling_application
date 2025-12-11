import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useStudentAuth} from "@/context/StudentAuth";
import axios from 'axios';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr]           = useState('');
  const { login }               = useStudentAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // 1) call the backend
      const { data } = await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        formData                                         // { email, password }
      );

      // 2) save token + student in context / localStorage
      login(data.token, data.student);

      // 3) go to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] font-sans">
      <div className="bg-white p-6 rounded-lg shadow-md w-[300px]">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center text-xl font-semibold mb-5">Sign In</h2>

          <label htmlFor="email" className="mb-1 text-sm">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="password" className="mb-1 text-sm">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 transition"
          >
            Sign In
          </button>
          {err && <p>err</p>}
          <div className="flex justify-between text-xs mt-4">
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
