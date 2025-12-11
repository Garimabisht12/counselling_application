import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuth';

export default function AdminLogin() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr]           = useState('');
  const navigate = useNavigate();
  const { login }  = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/admin/login', {
        email,
        password,
      });
      login(data.token, { email });          // basic info
      navigate('/admin');                    // go to dashboard
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={email} onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email" className="border p-2 w-full" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password" className="border p-2 w-full" />
        <button className="bg-blue-600 text-white w-full py-2 rounded">Sign in</button>
        {err && <p className="text-red-600 text-sm">{err}</p>}
      </form>
    </div>
  );
}


