import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext.js";
import SidebarLayout from "../components/SidebarLayout.jsx";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, fetchUser } = useContext(UserContext);
  useEffect(() => {
      if (!user) {
        fetchUser(); // 🔁 Attempt to refetch user on page load
      }
        toast.success("🎉 Login Successful!");
    }, [user, fetchUser]);

  return (
    <SidebarLayout>
      <div className="max-w-xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded shadow text-center">
        <img
          src={user?.picture}
          alt="User Avatar"
          className="w-24 h-24 mx-auto rounded-full border-2 border-indigo-500 shadow"
          referrerPolicy="no-referrer"
        />
        <h2 className="text-2xl font-bold mt-4 text-indigo-700 dark:text-indigo-300">
          {user?.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {user?.email}
        </p>
      </div>
    </SidebarLayout>
  );
};

export default Profile;
