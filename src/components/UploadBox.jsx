import { useRef, useState } from "react";
import * as XLSX from "xlsx";

const UploadBox = ({ onDataParsed }) => {
  const [fileName, setFileName] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const tableRef = useRef(null); // ⬅️ For auto-scroll

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://excelanalytics-backend-l7ql.onrender.com/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (json.success) {
      const defaultSheet = json.sheets[0];
      setSheetNames(json.sheets);
      setSelectedSheet(defaultSheet);

      localStorage.setItem("excelData", JSON.stringify(json.data));
      localStorage.setItem("selectedSheet", defaultSheet);

      const uploadHistory =
        JSON.parse(localStorage.getItem("uploadHistory")) || [];
      uploadHistory.push({
        name: file.name,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("uploadHistory", JSON.stringify(uploadHistory));

      setExcelData(json.data);
      onDataParsed(json.data);

      // Auto-scroll to table
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleSheetChange = (sheetName) => {
    setSelectedSheet(sheetName);

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });

      localStorage.setItem("excelData", JSON.stringify(data));
      localStorage.setItem("selectedSheet", sheetName);
      setExcelData(data);
      onDataParsed(data);

      // Auto-scroll on sheet change
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    };

    reader.readAsBinaryString(uploadedFile);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedSheet || "Sheet1");
    XLSX.writeFile(workbook, `Cleaned-${selectedSheet || "Sheet1"}.xlsx`);
  };

  return (
    <div className="border-2 border-dashed border-indigo-400 rounded-lg p-6 text-center bg-white dark:bg-gray-800">
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-300">
        Drag and drop or click to upload Excel file (.xlsx)
      </p>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFile}
        className="w-full text-sm text-gray-600"
      />

      {fileName && (
        <p className="mt-2 text-indigo-600 font-semibold">{fileName}</p>
      )}

      {/* Sheet Selection UI */}
      {sheetNames.length > 1 && (
        <div className="mt-4 text-left">
          <label className="block mb-1 text-sm text-indigo-600 font-medium">
            📄 Sheet: {selectedSheet}
          </label>
          <select
            title="Select a sheet to visualize"
            value={selectedSheet}
            onChange={(e) => handleSheetChange(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {sheetNames.map((sheet, idx) => (
              <option key={idx} value={sheet}>
                {sheet}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Export Button */}
      {excelData.length > 0 && (
        <button
          onClick={handleExport}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          📤 Export Cleaned Excel
        </button>
      )}

      {/* Anchor for auto-scroll */}
      <div ref={tableRef}></div>
    </div>
  );
};

export default UploadBox;
