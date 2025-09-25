import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleAuth() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
      } else {
        console.log("Session:", data.session);
        navigate("/"); // رجّع المستخدم للصفحة الرئيسية أو داشبوردك
      }
    }

    handleAuth();
  }, [navigate]);

  return <p>Signing you in...</p>;
}
export default AuthCallback;
