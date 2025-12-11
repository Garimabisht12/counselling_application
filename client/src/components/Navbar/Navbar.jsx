// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-gradient-to-r from-[#4b2c92] to-[#3a2070] text-white shadow-lg">
      <div className="mx-auto max-w-7xl flex items-center justify-between py-4 px-4">

        
        {/* Center College Details */}
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold sm:text-2xl tracking-wide">
            ABC UNIVERSITY
          </h1>
          <h2 className="text-sm opacity-90 sm:text-base font-light">
            123 Main Street, Applewood - xxxxxx
          </h2>
        </div>

        
      </div>
    </header>
  );
}
