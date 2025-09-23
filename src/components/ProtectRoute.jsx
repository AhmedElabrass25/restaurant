// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectRoute({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) return <p>Loading...</p>;

//   // إذا مش عامل Login → يروح للـ /login
//   if (!user) {
//     return <Navigate to="/signin" replace />;
//   }

//   // إذا عامل Login → يسيبك تشوف الصفحة المحمية
//   return children;
// }
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    // لو مش عامل Login → يروح للـ /signin
    return <Navigate to="/signin" replace />;
  }

  const isAdmin = user.email === "ahmed@admin.com";

  if (adminOnly && !isAdmin) {
    // صفحة Admin و المستخدم مش Admin → ارجع للصفحة الرئيسية
    return <Navigate to="/" replace />;
  }

  if (!adminOnly && isAdmin) {
    // صفحة User و المستخدم Admin → ارجع للصفحة الرئيسية
    return <Navigate to="/" replace />;
  }

  // مسموح له يشوف الصفحة
  return children;
}
