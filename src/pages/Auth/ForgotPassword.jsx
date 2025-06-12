// src/pages/Auth/ForgotPassword.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import GoBackButton from "../../components/GoBackButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

 const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://excelanalytics-backend-l7ql.onrender.com/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send reset link");

      toast.success("📧 Password reset link sent to your email");
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <GoBackButton />
        <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          Forgot Password
        </h2>
        <form className="space-y-4" onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
