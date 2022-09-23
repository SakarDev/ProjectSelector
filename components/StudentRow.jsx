const StudentRow = ({ index, stdName, stdAvg, groupAvg, rowSpanSize }) => {
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
      {/* the styles breaks if per each row you add a td with rowSpan 3 so at the beggining of the group meaning index=0 this td only should be added ;) */}
      {index === 0 && (
        <td rowSpan={rowSpanSize} className="text-center">
          <span className="badge bg-warning text-dark">{groupAvg}</span>
        </td>
      )}
    </tr>
  );
};

export default StudentRow;
