import _ from "lodash";

export default function TableBody({ data, onLike, onDelete, columns }) {
  const renderCell = (item, column) => {
    return column.content ? column.content(item) : _.get(item, column.path);
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={column.path || column.key}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
