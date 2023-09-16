import "./tableList.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const TableList = ({
  tableData,
  handleDeletedRow,
  deleteRowsList,
  setDeletedRows,
}) => {
  return (
    <tr id={`table-${tableData.id}`}>
      <td className="text-align">
        <input
          type="checkbox"
          id={`checkbox-${tableData.id}`}
          name="checkbox"
          className="checkbox-size"
          onClick={(e) => {
            let idVal = e.target.id.substring(9);
            let checkBoxElement = document.querySelector(`#checkbox-${idVal}`);
            let newList = deleteRowsList;

            if (checkBoxElement.checked === true) {
              newList.push(idVal);
              document.querySelector(`#table-${idVal}`).style =
                "background-color: grey;";
            } else {
              let ind = newList.indexOf(idVal);
              newList.splice(ind, 1);
              document
                .querySelector(`#table-${idVal}`)
                .removeAttribute("style");
            }

            setDeletedRows(newList);
          }}
        ></input>
      </td>
      <td className="text-align">{tableData.name}</td>
      <td className="text-align">{tableData.email}</td>
      <td className="text-align">{tableData.role}</td>
      <td className="text-align">
        <div className="icons-spacing">
          <ModeEditOutlineOutlinedIcon />
          <DeleteOutlinedIcon
            id={tableData.id}
            className="delete-icon"
            onClick={handleDeletedRow}
          />
        </div>
      </td>
    </tr>
  );
};

export default TableList;
