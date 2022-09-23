import SelectorRows from "../../components/SelectorRows";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, query } from "firebase/firestore";

const Selector = () => {
  const [data, setData] = useState([]);

  async function getStudents() {
    const q = query(collection(db, "submitedForm"));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  function processFunction() {
    setData([]);
    let copiedData = [];
    getStudents()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          copiedData = [...copiedData, doc.data()];
          // setData((data) => [...data, doc.data()]);
        });

        setData((data) => {
          copiedData = [...copiedData];
          copiedData = copiedData.sort(
            (a, b) => Number(b.groupAverage) - Number(a.groupAverage)
          );
          return copiedData;
        });
        console.log("cop", copiedData);
      })
      .catch((err) => console.log(err));
  }

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
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
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
                    Project Title
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Group Average
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length ? (
                  data.map((record, index) =>
                    Object.keys({ ...record }.studentNames).map(
                      (val, index) => (
                        <SelectorRows
                          key={index}
                          index={index}
                          stdName={{ ...record }.studentNames[index]}
                          stdAvg={{ ...record }.averageMarks[index]}
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
                      No data Found. Click start processing button to select
                      projects per each group.
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
