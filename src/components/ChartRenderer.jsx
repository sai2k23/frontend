import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line, Pie, Doughnut, Radar, Scatter } from "react-chartjs-2";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

ChartJS.register(...registerables);

const chartMap = {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  Scatter,
};

const ChartRenderer = ({ chartConfig }) => {
  const chartRef = useRef(null);
  const ChartComponent = chartMap[chartConfig.type];

  // 🖼️ PNG Export
  const handleImageDownload = () => {
    const chart = chartRef.current;
    const url = chart.toBase64Image();
    const a = document.createElement("a");
    a.href = url;
    a.download = "excel-chart.png";
    a.click();
  };

  // 📄 PDF Export
  const handlePDFDownload = async () => {
    const chartContainer = document.getElementById("chart-box");
    const canvas = await html2canvas(chartContainer);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("excel-chart.pdf");
  };

  return (
    <div
      id="chart-box"
      className="mt-6 bg-white dark:bg-gray-800 p-4 rounded shadow-md text-center"
    >
      <ChartComponent
        data={{
          labels: chartConfig.labels,
          datasets: chartConfig.datasets,
        }}
        options={{ responsive: true }}
        ref={chartRef}
      />

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <button
          onClick={handleImageDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          🖼️ Download PNG
        </button>
        <button
          onClick={handlePDFDownload}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
        >
          📄 Export PDF
        </button>
      </div>
    </div>
  );
};

export default ChartRenderer;
