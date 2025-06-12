// src/pages/Auth/Register.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import GoBackButton from "../../components/GoBackButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allChecksPassed = Object.values(passwordChecks).every(Boolean);
    if (!allChecksPassed) {
      toast.error("❌ Please meet all password requirements.");
      return;
    }
    try {
      const res = await fetch("https://excelanalytics-backend-l7ql.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json(); // 👈 important
      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast.success("✅ Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <GoBackButton />
        <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
          />
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white pr-10"
            />
            <span
              className="absolute top-3 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
