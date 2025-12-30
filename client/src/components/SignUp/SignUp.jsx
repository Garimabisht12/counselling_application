import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStudentAuth } from "@/context/StudentAuth";
import axios from "../../api/axios";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { login } = useStudentAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setErr("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/auth/register",
        formData
      );

      login(data.token, data.student);
      navigate("/admissionform", { replace: true });
    } catch (error) {
      setErr(error.response?.data?.message || "Sign-up failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-1 text-gray-700 hover:text-black"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center text-2xl font-bold mb-5">Create Account</h2>

          {/* NAME */}
          <label className="text-sm mb-1">Full Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* EMAIL */}
          <label className="text-sm mb-1">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* PASSWORD */}
          <label className="text-sm mb-1">Password:</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-10 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-600"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <label className="text-sm mb-1">Confirm Password:</label>
          <div className="relative">
            <input
              type={showCPass ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 w-full pr-10 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowCPass(!showCPass)}
              className="absolute right-3 top-2.5 text-gray-600"
            >
              {showCPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* ERROR */}
          {err && (
            <p className="text-red-600 text-center text-sm font-medium mb-2">
              {err}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 mt-2 hover:bg-blue-700 transition font-semibold"
          >
            Sign Up
          </button>

          {/* LINK */}
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
