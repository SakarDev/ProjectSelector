const StudentRow = ({ index, stdName, stdAvg, groupAvg }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index + 1}
      </th>

      <td>
        <span className="badge bg-warning text-dark">{stdName}</span>
      </td>
      <td>
        <span className="badge bg-warning text-dark">{stdAvg}</span>
      </td>
      <td>
        <span className="badge bg-warning text-dark">{groupAvg}</span>
      </td>
    </tr>
  );
};

export default StudentRow;
