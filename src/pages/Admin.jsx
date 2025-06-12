import { useEffect, useState } from "react";
import SidebarLayout from "../components/SidebarLayout";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://excelanalytics-backend-l7ql.onrender.com/api/admin/users")
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  return (
    <SidebarLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-300">
          🛡️ Admin Dashboard
        </h1>
        <ul className="text-sm">
          {users.map(user => (
            <li key={user._id} className="border-b py-2">
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </SidebarLayout>
  );
};

export default Admin;
