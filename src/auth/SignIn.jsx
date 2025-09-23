import { useState } from "react";
import { supabase } from "../supabaseClient";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ تسجيل الدخول من Supabase مباشرة
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // ✅ لو أدمن
    if (
      data.user.email === "ahmed@admin.com" &&
      data.user.password === "admin"
    ) {
      alert("Welcome Admin!");
      navigate("/addProduct");
    } else {
      // ✅ مستخدم عادي
      alert("Logged in successfully!");
      navigate("/addProduct");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({ provider: "google" });
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({ provider: "github" });
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignIn}
        className="bg-white p-6 rounded-xl shadow-lg w-[500px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        {/* ✅ Sign in with Google */}
        <div className="flex gap-2 mt-4 mb-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-1/2 flex justify-center items-center gap-2 p-2 rounded text-white ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in with Google"
            )}
          </button>

          {/* <button
            type="button"
            onClick={handleGithubLogin}
            disabled={loading}
            className={`w-1/2 flex justify-center items-center gap-2 p-2 rounded text-white ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-900"
            }`}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in with GitHub"
            )}
          </button> */}
        </div>
        {/* ✅ Sign in */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 p-2 rounded text-white ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-center mt-4">
          Don't have an account?
          <a href="/signup" className="text-blue-500 hover:underline ml-1">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
export default SignIn;
