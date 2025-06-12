import { useState, useEffect } from "react";
import ChartForm from "../components/ChartForm";
import ChartRenderer from "../components/ChartRenderer";
import ChartInsightBox from "../components/ChartInsightBox";
import ChartShareLink from "../components/ChartShareLink";
import SidebarLayout from "../components/SidebarLayout";

const Visualize = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");

  // Filter states
  const [filterCol, setFilterCol] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("excelData");
    const query = new URLSearchParams(window.location.search);
    const encodedChart = query.get("chart");
    if (encodedChart) {
      try {
        const decoded = JSON.parse(atob(encodedChart));
        setChartData(decoded);
      } catch (err) {
        console.error("Invalid chart data in URL");
      }
    }
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);
      setFilteredData(parsed); // Default = all
    }
  }, []);

  // Filter logic
  useEffect(() => {
    if (!filterCol || !filterVal) {
      setFilteredData(data);
      return;
    }
    const colIndex = data[0]?.indexOf(filterCol);
    if (colIndex === -1) return;

    const filtered = [
      data[0],
      ...data.slice(1).filter((row) => row[colIndex] === filterVal),
    ];
    setFilteredData(filtered);
  }, [filterCol, filterVal, data]);

  const handleSummarize = async () => {
    const res = await fetch("https://excelanalytics-backend-l7ql.onrender.com/api/gemini/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: filteredData }),
    });
    const json = await res.json();
    setSummary(json.summary);
  };
  const headers = data[0] || [];
  const filterOptions = filterCol
    ? [...new Set(data.slice(1).map((row) => row[data[0].indexOf(filterCol)]))]
    : [];

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
          <h1
            className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-6 "
            data-aos="fade-up"
          >
            📊 Visualize Your Excel Data
          </h1>

          {/* 🔍 Column Filter UI */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md space-y-3 mb-4">
            <h2 className="font-semibold text-indigo-500 text-lg">
              🧩 Filter Your Data
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Filter Column */}
              <div className="flex-1">
                <label className="block mb-1 text-sm">Filter Column</label>
                <select
                  value={filterCol}
                  onChange={(e) => {
                    setFilterCol(e.target.value);
                    setFilterVal(""); // reset value
                  }}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option value="">-- Select Column --</option>
                  {headers.map((col, idx) => (
                    <option key={idx} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Value */}
              <div className="flex-1">
                <label className="block mb-1 text-sm">Filter Value</label>
                <select
                  value={filterVal}
                  onChange={(e) => setFilterVal(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                  disabled={!filterCol}
                >
                  <option value="">-- Select Value --</option>
                  {filterOptions.map((val, idx) => (
                    <option key={idx} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 📊 Chart Section */}
          <ChartForm
            rawData={filteredData}
            onGenerate={setChartData}
            xKey={xKey}
            yKey={yKey}
            setXKey={setXKey}
            setYKey={setYKey}
          />

          {chartData && (
            <>
              <ChartInsightBox data={filteredData} xKey={xKey} yKey={yKey} />
              <ChartRenderer chartConfig={chartData} />
              <ChartShareLink chartData={chartData} />
              <div className="text-center mt-6">
                <button
                  onClick={handleSummarize}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded shadow"
                >
                  🧠 Summarize with AI
                </button>
              </div>

              {summary && (
                <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded shadow text-left">
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-300 mb-2">
                    🔍 AI Summary
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {summary}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Visualize;
