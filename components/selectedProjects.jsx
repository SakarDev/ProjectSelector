import React, { useState } from "react";
import { read, utils, writeFile } from "xlsx";

const SelectedProjects = () => {
  const handleExport = () => {
    const headings = [
      ["Student_names", "Average_marks", "Project_number", "Project_title"],
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Movie Report.xlsx");
  };
  return (
    <>
      <div className="block">
        <button
          onClick={handleExport}
          type="button"
          className="float-right  text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Export<i className="fa fa-download"></i>
        </button>
      </div>
    </>
  );
};

export default SelectedProjects;
