// src/pages/Auth/Login.jsx
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import GoBackButton from "../../components/GoBackButton";
import GoogleLoginButton from "../../components/GoogleLoginButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { fetchUser } = useContext(UserContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://excelanalytics-backend-l7ql.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");
      await fetchUser(); // ✅ Refresh user context immediately
      toast.success("✅ Logged in successfully");
      navigate("/dashboard");
    } catch (err) {
      toast.error("❌ Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <GoBackButton />
        <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
          Login to ExcelAnalytics
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
          <Link to="/register">Don’t have an account? Register</Link>
          <Link to="/forgot-password" className="text-indigo-500">Forgot Password?</Link>
        </div>

        <div className="flex items-center justify-between my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <GoogleLoginButton />
      </div>
    </div>
  );
};

export default Login;
