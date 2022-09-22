import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

// import StudentsComp from "../../components/Students";
const Students = () => {
  const [students, setStudents] = useState([]);
  const [counter, setCounter] = useState(1);

  async function getStudents() {
    const q = query(collection(db, "submitedForm"));

    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  useEffect(() => {
    getStudents()
      .then((snapShot) => {
        // console.log("2 jar");
        snapShot.forEach((doc) => {
          // console.log(doc.data().studentNames);
          setStudents((students) => [...students, doc.data().studentNames]);
          //   setStudents(doc.data());
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
                </tr>
              </thead>

              {/* {console.log("stud", students[0]?.studentNames[0])} */}

              <tbody>
                {students.length
                  ? students.forEach((record) => {
                      console.log(record);
                      // console.log(record.keys().length);
                      // record.studentNames.forEach((std) => {
                      //   console.log(std);
                      // });
                      // record.forEach((rec) => {
                      //   console.log(rec);
                      //   // setCounter(counter + 1);
                      //   // console.log(stdName);
                      // });
                    })
                  : null}

                {/* {students.length ? (
                  students.map((record, index) => (
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
                          {record.studentNames}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b h-24 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="5" className="text-center">
                      No data Found.
                    </td>
                  </tr>
                )} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
