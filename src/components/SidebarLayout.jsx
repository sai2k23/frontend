import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Upload,
  BarChart3,
  LogOut,
  Menu,
  User,
  Sun,
  Moon,
  Shield,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const SidebarLayout = ({ children }) => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // 👈

  const logout = async () => {
    await fetch("https://excelanalytics-backend-l7ql.onrender.com/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    setUser(null);
    toast("👋 Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 300);
  };
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };
  // 🔁 Sync with LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme") === "dark";
    setDarkMode(stored);
    document.documentElement.classList.toggle("dark", stored);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  //Navigation items
  const navItems = [
    { path: "/dashboard", icon: <Home />, label: "Dashboard" },
    { path: "/upload", icon: <Upload />, label: "Upload Excel" },
    { path: "/visualize", icon: <BarChart3 />, label: "Visualize" },
    { path: "/profile", icon: <User />, label: "Profile" },
    // Conditional admin route
    ...(user?.email === "admin@example.com"
      ? [{ path: "/admin", icon: <Shield />, label: "Admin" }]
      : []),
  ];
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-64"
        } transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 shadow-md flex flex-col`}
      >
        {/* Toggle Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-4 flex items-center justify-center text-indigo-600 dark:text-white"
        >
          <Menu />
        </button>

        {!collapsed && (
          <h2 className="text-xl font-bold text-indigo-600 text-center mb-6">
            📊 ExcelAnalytics
          </h2>
        )}

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-gray-800 transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-indigo-100 text-indigo-700 dark:bg-gray-800"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="transition-transform duration-200">
                {item.icon}
              </span>
              {!collapsed && item.label}
            </Link>
          ))}
        </nav>

        {/* 🌙 Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`mt-2 px-3 py-2 rounded-lg flex items-center justify-center gap-2 border ${
            collapsed ? "w-12 mx-auto" : "w-full"
          } ${
            darkMode
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && (darkMode ? "Light Mode" : "Dark Mode")}
        </button>

        {/* 🚪 Logout */}
        <button
          onClick={logout}
          className={`mt-4 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 ${
            collapsed ? "w-12 mx-auto" : "w-full"
          }`}
        >
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
