import "./tablelist.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const TableList = ({
  tableData,
  handleEditRow,
  handleSaveRow,
  handleDeletedRow,
  deleteRowsList,
  setDeletedRows,
}) => {
  let [showEditButton, setShowEditButton] = useState(true);
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
              document
                .querySelector(`#table-${idVal}`)
                .setAttribute("style", "background-color: grey;");
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

      <td className="text-align" id={`name-${tableData.id}`}>
        {tableData.name}
      </td>

      <td className="text-align" id={`email-${tableData.id}`}>
        {tableData.email}
      </td>

      <td className="text-align" id={`role-${tableData.id}`}>
        {tableData.role}
      </td>

      <td className="text-align">
        <div className="icons-spacing">
          {showEditButton && (
            <ModeEditOutlineOutlinedIcon
              id={tableData.id}
              className="edit-cursor"
              onClick={(e) => {
                setShowEditButton(false);
                handleEditRow(e);
              }}
            />
          )}
          {!showEditButton && (
            <CheckIcon
              id={tableData.id}
              className="set-cursor"
              onClick={(e) => {
                handleSaveRow(e);
                setShowEditButton(true);
              }}
            />
          )}
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
