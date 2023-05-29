import SelectorRows from "../../components/SelectorRows";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { utils, writeFile } from "xlsx";

const Selector = () => {
  const [data, setData] = useState([]);
  var dataToExport = [];

  async function getStudents() {
    const q = query(collection(db, "submitedForm"));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  async function updateStudents(targetDoc, data) {
    await updateDoc(targetDoc, {
      selectedProject: data,
    });
  }

  // useEffect(() => {
  //   processFunction();
  // }, []);

  function processFunction() {
    setData([]);
    let copiedData = [];
    getStudents()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let d = doc.data();
          d.id = doc.id;
          copiedData = [...copiedData, d];
        });

        const dataToSort = [...copiedData];
        dataToSort.sort(
          (a, b) => Number(b.groupAverage) - Number(a.groupAverage)
        );

        copiedData = dataToSort;

        var projectNumbers = [];

        // we take the project numbers from the first group of student & it's the most accurate one since it's the first ranking group
        for (
          let i = 0;
          i < Object.keys(copiedData[0].projectNumber).length;
          i++
        ) {
          projectNumbers[i] = copiedData[0].projectNumber[i];
        }

        // We save the project numbers for each group in this array in the database
        for (var i = 0; i < Object.keys(copiedData).length; i++) {
          w: for (var j = 0; j < Object.keys(copiedData[i]).length; j++) {
            for (
              let k = 0;
              k < Object.keys(copiedData[i].projectNumber).length;
              k++
            ) {
              if (projectNumbers.includes(copiedData[i].projectNumber[k])) {
                var currentStudentDoc = doc(
                  db,
                  "submitedForm",
                  copiedData[i].id
                );
                updateStudents(
                  currentStudentDoc,
                  copiedData[i].projectNumber[k]
                );
                projectNumbers = projectNumbers.filter(
                  (id) => id !== copiedData[i].projectNumber[k]
                );
                // the break should go out 2 loops since the project number is found for the whole group ;)
                break w;
              }
            }
          }
        }

        setData(copiedData);
      })
      .catch((err) => console.log(err));
  }

  const handleExport = () => {
    const headings = [["Student_names", "Project_number"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);

    data.length &&
      data.forEach((item) => {
        Object.keys({ ...item }.studentNames).forEach((key) => {
          dataToExport.push([
            { ...item }.studentNames[key],
            { ...item }.selectedProject,
          ]);
        });
      });

    utils.sheet_add_json(ws, dataToExport, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Project Selector.xlsx");
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex mb-2">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
          font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          onClick={() => processFunction()}
        >
          Start processing | Reload
        </button>
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 
          font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600
           dark:focus:ring-gray-800"
          onClick={() => handleExport()}
        >
          Export to excel
        </button>
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
                    Student Names
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Project Number
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Group Average
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length ? (
                  data.map((record, index1) =>
                    Object.keys({ ...record }.studentNames).map(
                      (val, index) => (
                        <SelectorRows
                          key={index}
                          id={index}
                          index={index}
                          stdName={{ ...record }.studentNames[index]}
                          selectedProj={{ ...record }.selectedProject}
                          groupAvg={{ ...record }.groupAverage}
                          rowSpanSize={
                            Object.keys({ ...record }.studentNames).length
                          }
                        />
                      )
                    )
                  )
                ) : (
                  <tr className="bg-white border-b h-24 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="5" className="text-center">
                      Click start processing button to select group projects.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selector;
