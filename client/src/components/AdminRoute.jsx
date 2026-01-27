import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuth';

export default function AdminRoute({ children }) {
  const { token } = useAdminAuth();
  if (!token) return <Navigate to="/adminsignin" replace />;
  return children;
}
