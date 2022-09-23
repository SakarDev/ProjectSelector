import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import StudentRow from "../../components/StudentRow";
import { db } from "../../firebaseConfig";

const Students = () => {
  const [data, setData] = useState([]);
  const [rowSpanSize, setRowSpanSize] = useState(1);

  async function getStudents() {
    const q = query(collection(db, "submitedForm"));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  useEffect(() => {
    setData([]);
    getStudents()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          setData((data) => [...data, doc.data()]);
          setRowSpanSize(Object.keys(doc.data().studentNames).length);
          console.log(doc.data());
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
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
                    Student Average
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
                        <StudentRow
                          key={index}
                          index={index}
                          stdName={{ ...record }.studentNames[index]}
                          stdAvg={{ ...record }.averageMarks[index]}
                          groupAvg={{ ...record }.groupAverage}
                          rowSpanSize={rowSpanSize}
                        />
                      )
                    )
                  )
                ) : (
                  <tr className="bg-white border-b h-24 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="5" className="text-center">
                      No data Found or still loading...
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

export default Students;
