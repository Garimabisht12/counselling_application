import { Link } from "react-router-dom";
import { User, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f9] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 text-center font-sans">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#2c3e50] mb-4">
          Welcome to the Counselling System
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[#555] mb-8">
          Please choose your sign-in method:
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          {/* Applicant Sign In */}
          <Link
            to="/signIn"
            className="flex items-center justify-center gap-2 w-full sm:w-[45%] px-6 py-3 text-white text-lg rounded-lg bg-[#3498db] hover:bg-[#2980b9] transition transform hover:-translate-y-1"
          >
            <User size={20} />
            Applicant
          </Link>

          {/* Admin Sign In */}
          <Link
            to="/adminSignIn"
            className="flex items-center justify-center gap-2 w-full sm:w-[45%] px-6 py-3 text-white text-lg rounded-lg bg-[#e74c3c] hover:bg-[#c0392b] transition transform hover:-translate-y-1"
          >
            <Shield size={20} />
            Admin
          </Link>

        </div>
      </div>
    </div>
  );
}
