import SelectorRows from "../../components/SelectorRows";

const Selector = () => {
  return (
    <div className="flex flex-col justify-center">
      <button
        type="button"
        className="text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Start processing
      </button>

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

              {/* <tbody>
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
                          rowSpanSize={rowSpanSize}
                        />
                      )
                    )
                  )
                ) : (
                  <tr className="bg-white border-b h-24 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td colSpan="5" className="text-center">
                      No data Found.
                    </td>
                  </tr>
                )}
              </tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selector;
