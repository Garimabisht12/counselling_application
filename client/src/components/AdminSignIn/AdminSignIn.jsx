import { useState } from 'react';
import axios from '@/api/axios';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuth';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/admin/login',
        { email, password },
        
      );
      login(data.token, { email });
      navigate('/admin');
    } catch (error) {
      setErr(error.response?.data?.message || `Login failed  `);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 flex items-center gap-2 text-gray-700 hover:text-black"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password + Show button */}
          <div>
            <label className="text-sm">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="border p-3 w-full rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Eye / EyeOff toggle */}
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {show ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {err && <p className="text-red-600 text-sm">{err}</p>}

          {/* Submit */}
          <button className="bg-blue-600 text-white w-full py-2.5 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
