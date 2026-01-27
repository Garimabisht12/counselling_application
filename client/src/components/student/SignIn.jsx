import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStudentAuth } from "@/context/StudentAuth";
import axios from '@/api/axios';
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  
  const [show, setShow] = useState(false);
  
  const { login } = useStudentAuth();
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/auth/login",
        formData
      );
      login(data.token, data.student);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-1 text-gray-700 hover:text-black"
      >
      <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xs">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center text-2xl font-bold mb-5">Log In</h2>
          <label htmlFor="email" className="text-sm mb-1">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="password" className="text-sm mb-1">Password:</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-10 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-2.5 text-gray-600"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>


          {err && (
            <p className="text-red-600 text-sm mb-3 text-center font-medium">
              {err}
            </p>
          )}

          <button className="bg-blue-600 text-white rounded-lg py-2 mt-2 hover:bg-blue-700 transition font-semibold">
            Sign In
          </button>

          <div className="flex justify-between text-xs mt-4">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <Link to="/studentSignUp" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}
