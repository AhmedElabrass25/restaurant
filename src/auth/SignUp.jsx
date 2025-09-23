import { useState } from "react";
import { supabase } from "../supabaseClient";
import { FaSpinner } from "react-icons/fa"; // 👈 أيقونة التحميل

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      alert("Account created! Please check your email.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-xl shadow-lg w-[500px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

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

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 p-2 rounded text-white ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin text-white" />
              Loading...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-center mt-4">
          Already have an account?
          <a href="/SignIn" className="text-blue-500 ml-1">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
