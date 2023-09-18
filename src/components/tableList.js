import "./tablelist.css";
import { useState } from "react";

const TableList = ({
  tableData,
  dataList,
  setDataList,
  setOriginalDataList,
  setCurrentPage,
  setTotalItems,
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
            <button
              id={tableData.id}
              className="edit-icon"
              onClick={(e) => {
                setShowEditButton(false);
                let tableElement = document.querySelector(
                  `#table-${e.target.id}`
                );
                if (tableElement !== null) {
                  let name = tableElement.children[1].innerHTML;
                  let email = tableElement.children[2].innerHTML;
                  let role = tableElement.children[3].innerHTML;

                  tableElement.children[1].innerHTML = `<input type="text" id="name_text" value="${name}">`;
                  tableElement.children[2].innerHTML = `<input type="text" id="email_text" value="${email}">`;
                  tableElement.children[3].innerHTML = `<input type="text" id="role_text" value="${role}">`;
                }
              }}
            >
              Edit
            </button>
          )}
          {!showEditButton && (
            <button
              id={tableData.id}
              className="set-icon"
              onClick={(e) => {
                let new_name = document.getElementById(`name_text`).value;
                let new_email = document.getElementById(`email_text`).value;
                let new_role = document.getElementById(`role_text`).value;

                document.getElementById(`name-${e.target.id}`).innerHTML =
                  new_name;
                document.getElementById(`email-${e.target.id}`).innerHTML =
                  new_email;
                document.getElementById(`role-${e.target.id}`).innerHTML =
                  new_role;

                let newList = [];
                dataList.forEach((obj) => {
                  if (obj.id === e.target.id) {
                    newList.push({
                      id: e.target.id,
                      name: new_name,
                      email: new_email,
                      role: new_role,
                    });
                  } else {
                    newList.push(obj);
                  }
                });
                setDataList(newList);
                setCurrentPage(1);
                setOriginalDataList(newList);
                setTotalItems(newList.length);
                setShowEditButton(true);
              }}
            >
              OK
            </button>
          )}
          <button
            id={tableData.id}
            className="delete-icon"
            onClick={(e) => {
              let newList = [];
              dataList.forEach((obj) => {
                if (obj.id !== e.target.id) {
                  newList.push(obj);
                }
              });
              setDataList(newList);
              setCurrentPage(1);
              setOriginalDataList(newList);
              setTotalItems(newList.length);
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableList;
