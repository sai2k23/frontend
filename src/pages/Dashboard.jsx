import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import DashboardStats from "../components/DashboardStats.jsx";
import SidebarLayout from "../components/SidebarLayout.jsx";
const Dashboard = () => {
  const { user, fetchUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      fetchUser(); // 🔁 Attempt to refetch user on page load
    }
  }, [user, fetchUser]);

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-center relative px-4">
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        {/* 🎯 Dashboard Welcome */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-white mt-4">
          🚀 Welcome to ExcelAnalytics Dashboard!
        </h1>
        <DashboardStats />
        {/* ➕ Upload Excel Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/upload")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow text-lg"
          >
            ➕ Upload Excel
          </button>
        </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Dashboard;
