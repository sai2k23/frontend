import GoBackButton from "./GoBackButton";
const ExcelTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="overflow-x-auto max-w-full">
      <GoBackButton />
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <thead className="bg-indigo-600 text-white sticky top-0">
          <tr>
            {data[0].map((cell, i) => (
              <th key={i} className="py-2 px-4 border">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-gray-100 dark:odd:bg-gray-700">
              {row.map((cell, i) => (
                <td key={i} className="py-2 px-4 border text-sm text-center">
                  {cell || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcelTable;
