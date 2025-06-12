import { useState } from "react";
import UploadBox from "../components/UploadBox";
import ExcelTable from "../components/ExcelTable";
import InsightBox from "../components/InsightBox";
import { Link } from "react-router-dom";
import SidebarLayout from "../components/SidebarLayout";

const Upload = () => {
  const [excelData, setExcelData] = useState([]);

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-6">
          📊 Excel Upload & Preview
        </h1>
        <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
          <UploadBox onDataParsed={setExcelData} />
          <ExcelTable data={excelData} />
          <InsightBox data={excelData} />
        </div>
        {excelData.length > 0 && (
          <>
            {localStorage.setItem("excelData", JSON.stringify(excelData))}
            <div className="text-center mt-6">
              <Link to="/visualize">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700">
                  📊 Visualize Excel →
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </SidebarLayout>
  );
};

export default Upload;
