
import React from "react";

const ChartInsightBox = ({ data, xKey, yKey }) => {
  if (!data || !xKey || !yKey) return null;

  const xIndex = data[0].indexOf(xKey);
  const yIndex = data[0].indexOf(yKey);
  const rows = data.slice(1);

  const insights = rows.map((row) => ({
    x: row[xIndex],
    y: parseFloat(row[yIndex]) || 0,
  }));

  if (insights.length === 0) return null;

  const top = insights.reduce((a, b) => (a.y > b.y ? a : b));
  const bottom = insights.reduce((a, b) => (a.y < b.y ? a : b));
  const total = insights.reduce((sum, row) => sum + row.y, 0);

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded shadow-md text-left text-sm sm:text-base">
      <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
        🔍 Insight Summary
      </h3>
      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
        <li>📈 <strong>Top</strong> ({yKey}): {top.x} – {top.y}</li>
        <li>📉 <strong>Lowest</strong> ({yKey}): {bottom.x} – {bottom.y}</li>
        <li>🔢 <strong>Total</strong> {yKey}: {total.toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default ChartInsightBox;
