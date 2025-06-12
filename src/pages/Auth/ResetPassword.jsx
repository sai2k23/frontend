// src/pages/Auth/ResetPassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const allChecksPassed = Object.values(passwordChecks).every(Boolean);
    if (!allChecksPassed) {
      toast.error("❌ Please meet all password requirements.");
      return;
    }
    try {
      const res = await fetch(
        `https://excelanalytics-backend-l7ql.onrender.com/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!res.ok) throw new Error("Reset failed");
      toast.success("✅ Password reset successful");
      navigate("/login");
    } catch (err) {
      toast.error("❌ Invalid or expired token");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          Reset Your Password
        </h2>
        <form className="space-y-4" onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Reset Password

          </button>
           {/* ✅ Password Checklist UI */}
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <p className={passwordChecks.length ? "text-green-500" : ""}>
              ✔ At least 8 characters
            </p>
            <p className={passwordChecks.uppercase ? "text-green-500" : ""}>
              ✔ One uppercase letter
            </p>
            <p className={passwordChecks.lowercase ? "text-green-500" : ""}>
              ✔ One lowercase letter
            </p>
            <p className={passwordChecks.number ? "text-green-500" : ""}>
              ✔ One number
            </p>
            <p className={passwordChecks.special ? "text-green-500" : ""}>
              ✔ One special character
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
