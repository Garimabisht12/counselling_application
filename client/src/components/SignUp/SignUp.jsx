import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStudentAuth } from '@/context/StudentAuth';
import axios from "axios";
export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");

  const navigate = useNavigate();
const { login } = useStudentAuth();   // ← now you have login()


  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  //  check whether password matches or not:

  if (formData.password !== formData.confirmPassword) {
      return setErr('Passwords do not match');
    
    }


  try {
    const { data } = await axios.post(
      'http://localhost:5000/api/v1/auth/register',
      formData
    );

    login(data.token, data.student);          // ✅ saves token + student
    navigate('/admissionform', { replace: true });
  } catch (err) {
    console.log(err)
    setErr(err.response?.data?.message || 'Sign‑up failed');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] font-sans px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center text-xl font-semibold mb-5">Sign Up</h2>

          <label htmlFor="name" className="mb-1 text-sm">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="email" className="mb-1 text-sm">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
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
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label htmlFor="confirmPassword" className="mb-1 text-sm">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          

          <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 mt-2 hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
           {err && <p className="text-red-600">{err}</p>}
          <div className="text-sm mt-4 text-center">
            <Link to="/signIn" className="text-blue-600 hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
