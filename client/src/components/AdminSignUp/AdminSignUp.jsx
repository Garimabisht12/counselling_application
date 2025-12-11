import { Link, useNavigate } from "react-router-dom";

export default function AdminSignUp({ name = "", email = "" }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send data to your API here
    navigate("/adminView", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] font-sans px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h2 className="text-center text-xl font-semibold mb-5">
            Sign Up (Admin)
          </h2>

          <label htmlFor="name" className="mb-1 text-sm">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
            defaultValue={name}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label htmlFor="email" className="mb-1 text-sm">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            defaultValue={email}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <label htmlFor="confirmPassword" className="mb-1 text-sm">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white rounded py-2 mt-2 hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>

          <div className="text-sm mt-4 text-center">
            {/* adjust the route path to match your router setup */}
            <Link to="/adminSignIn" className="text-indigo-600 hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
