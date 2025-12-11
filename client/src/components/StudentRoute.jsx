import { Navigate } from 'react-router-dom';
import { useStudentAuth } from '@/context/StudentAuth';

/**
 * Protects any child route so only logged‑in students see it.
 * Usage:
 *   <Route
 *     path="/dashboard"
 *     element={
 *       <StudentRoute>
 *         <Dashboard />
 *       </StudentRoute>
 *     }
 *   />
 */
export default function StudentRoute({ children }) {
  const { token } = useStudentAuth();

  // If no JWT, bounce to login page
  return token ? children : <Navigate to="/login" replace />;
}
