import { useState } from "react";

const chartTypes = ["Bar", "Line", "Pie", "Doughnut", "Radar", "Scatter"];

const ChartForm = ({ rawData, onGenerate, xKey, yKey, setXKey, setYKey }) => {
  const [type, setType] = useState("Bar");

  const headers = rawData?.[0] || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!xKey || !yKey) {
      alert("❌ Select both X and Y axes");
      return;
    }

    const xIndex = headers.indexOf(xKey);
    const yIndex = headers.indexOf(yKey);

    const labels = rawData.slice(1).map((row) => row[xIndex]);
    const values = rawData.slice(1).map((row) => +row[yIndex]);

    onGenerate({
      type,
      labels,
      datasets: [
        {
          label: `${yKey} vs ${xKey}`,
          data: values,
          backgroundColor: "rgba(99, 102, 241, 0.5)",
          borderColor: "rgb(99, 102, 241)",
        },
      ],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow-md space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* X Axis */}
        <div>
          <label className="block text-sm mb-1">X Axis</label>
          <select
            value={xKey}
            onChange={(e) => setXKey(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">-- Select --</option>
            {headers.map((h, i) => (
              <option key={i} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* Y Axis */}
        <div>
          <label className="block text-sm mb-1">Y Axis</label>
          <select
            value={yKey}
            onChange={(e) => setYKey(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="">-- Select --</option>
            {headers.map((h, i) => (
              <option key={i} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        {/* Chart Type */}
        <div>
          <label className="block text-sm mb-1">Chart Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {chartTypes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow">
        🔍 Render Chart
      </button>
    </form>
  );
};

export default ChartForm;
