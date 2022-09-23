import React, { useEffect, useState } from "react";
import { read, utils, writeFile } from "xlsx";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const HomeComponent = () => {
  const [data, setData] = useState([]);

  // function to read excel file then convert to json
  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setData(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // whenever data changes (meaning new excel file is uploaded), save to firebase
  useEffect(() => {
    data.length && addDataToFirebase(data);
  }, [data]);

  async function addDataToFirebase(data) {
    try {
      let copyData = {};

      let projectTitle = {};
      let projectNumber = {};
      let studentNames = {};
      let averageMarks = {};
      let groupAverage = 0;

      for (let i = 0; i < data.length; i++) {
        projectTitle[i] = data[i].Project_title;
        projectNumber[i] = data[i].Project_number;

        // this check is performed to avoid the error of undefined
        data[i]?.Student_names
          ? (studentNames[i] = data[i].Student_names)
          : null;
        data[i]?.Average_marks
          ? (averageMarks[i] = data[i].Average_marks)
          : null;
      }

      for (let i = 0; i < Object.keys(averageMarks).length; i++) {
        groupAverage += averageMarks[i];
      }
      groupAverage /= Object.keys(averageMarks).length;
      groupAverage = groupAverage.toFixed(4);

      copyData = {
        projectTitle,
        projectNumber,
        studentNames,
        averageMarks,
        groupAverage,
      };

      await addDoc(collection(db, "submitedForm"), copyData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <>
      <div className="row mb-6 mt-5">
        <div className="col-sm-6 offset-3">
          <div className="row">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              type="file"
              name="file"
              id="inputGroupFile"
              required
              onChange={handleImport}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
            />
            <p
              className="mt-1 text-xs text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              SVG, XLSX.
            </p>
          </div>
        </div>
      </div>

      <div className="row clear-right">
        <div className="col-sm-6 offset-3">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Project title
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Project number
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Student name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Average marks
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length ? (
                  data.map((record, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td>
                        <span className="badge bg-warning text-dark">
                          {record.Project_title}
                        </span>
                      </td>
                      <td className="py-4 px-6">{record.Project_number}</td>
                      <td className="py-4 px-6">{record.Student_names}</td>
                      <td className="py-4 px-6">{record.Average_marks}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b h-24 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="5" className="text-center">
                      No data Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
