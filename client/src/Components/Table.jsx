import React from "react";

function Table({ columns, data }) {
  return (
    <>
      <div className="overflow-x-auto p-5">
        <table className="table table-zebra w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-primary text-white">
            <tr>
              {columns.map((column) => (
                <th key={column} className="p-3 text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {columns.map((column) => (
                  <td key={column} className="p-3 border-b">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
