// components/DashboardStats.jsx
import { useEffect, useState } from "react";

const DashboardStats = () => {
  const [uploadCount, setUploadCount] = useState(0);
  const [lastUpload, setLastUpload] = useState(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("uploadHistory")) || [];
    setUploadCount(history.length);
    setLastUpload(history[history.length - 1]);
  }, []);

  if (uploadCount === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-md text-left">
      <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-300 mb-4">
        📊 Upload Stats
      </h2>
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
        <li>📁 <strong>Total Uploads:</strong> {uploadCount}</li>
        <li>📝 <strong>Last File:</strong> {lastUpload?.name}</li>
        <li>🕒 <strong>Last Upload:</strong>{" "}
          {new Date(lastUpload?.timestamp).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </li>
      </ul>
    </div>
  );
};

export default DashboardStats;
