// client/src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Home         from "@/pages/Home";
import SignIn       from "@/pages/SignIn";
import SignUp       from "@/pages/SignUp";
import AdminSignIn  from "@/pages/AdminSignIn";
import AdminSignUp  from "@/pages/AdminSignUp";
import AdminView    from "@/pages/AdminView";
import AdmissionForm from "@/pages/AdmissionForm";
import Dashboard    from "@/pages/Dashboard";

import AdminRoute   from "@/components/AdminRoute";
import StudentRoute from "@/components/StudentRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* ---------- public routes ---------- */}
      <Route path="/"           element={<Home />} />
      <Route path="/signin"     element={<SignIn />} />
      <Route path="/signup"     element={<SignUp />} />
      <Route path="/adminsignin" element={<AdminSignIn />} />
      <Route path="/adminsignup" element={<AdminSignUp />} />
      <Route path="/admissionform" element={<AdmissionForm />} />

      {/* ---------- protected admin route ---------- */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminView />
          </AdminRoute>
        }
      />

      {/* ---------- protected student dashboard ---------- */}
      <Route
        path="/dashboard"
        element={
          <StudentRoute>
            <Dashboard />
          </StudentRoute>
        }
      />
{/* after successful signup → AdmissionForm */}
<Route
  path="/admissionform"
  element={
    <StudentRoute>
      <AdmissionForm />
    </StudentRoute>
  }
/>


      {/* ---------- catch‑all 404 ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
