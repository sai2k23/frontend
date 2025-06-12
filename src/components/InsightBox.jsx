import React from "react";

const InsightBox = ({ data }) => {
  if (!data || data.length <= 1) return null; // not enough rows

  const totalRows = data.length - 1;
  const headers = data[0];
  const columnToAnalyze = headers[0]; // default to first column

  const counts = {};
  for (let i = 1; i < data.length; i++) {
    const value = data[i][0];
    counts[value] = (counts[value] || 0) + 1;
  }

  const topEntries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
        <h3 className="text-xl font-semibold text-indigo-600">📊 Total Rows</h3>
        <p className="text-2xl mt-2 font-bold">{totalRows}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
        <h3 className="text-xl font-semibold text-indigo-600">🔢 Unique {columnToAnalyze}</h3>
        <p className="text-2xl mt-2 font-bold">{Object.keys(counts).length}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
        <h3 className="text-xl font-semibold text-indigo-600">🏆 Top Entries</h3>
        <ul className="text-sm mt-2 text-gray-600 dark:text-gray-300">
          {topEntries.map(([value, count]) => (
            <li key={value}>
              {value}: {count} times
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InsightBox;
