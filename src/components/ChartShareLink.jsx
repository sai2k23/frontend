// src/components/ChartShareLink.jsx
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";


const ChartShareLink = ({ chartData }) => {
  const [link, setLink] = useState("");

  useEffect(() => {
    if (chartData) {
      const encoded = btoa(JSON.stringify(chartData));
      const url = `${window.location.origin}/visualize?chart=${encoded}`;
      setLink(url);
    }
  }, [chartData]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("🔗 Link copied to clipboard!");
  };

  if (!link) return null;

  return (
    <div className="mt-4 bg-indigo-50 dark:bg-gray-800 p-4 rounded text-center">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        📤 Share this chart:
      </p>
      <div className="flex justify-center items-center gap-2 mt-2">
        <input
          type="text"
          value={link}
          readOnly
          className="px-2 py-1 border rounded w-full max-w-md dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={copyToClipboard}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded"
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChartShareLink;
