import "./adminUIPage.css";
import TableList from "./tablelist.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./pagination.js";

const AdminPage = (props) => {
  let [originalDataList, setOriginalDataList] = useState([]);
  let [dataList, setDataList] = useState([]);
  let [searchVal, setSearchVal] = useState("");
  let [deletedRowList, setDeletedRowList] = useState([]);

  useEffect(() => {
    (async () => {
      let jsonResponse = await fetchData();
      setDataList(jsonResponse);
      setOriginalDataList(jsonResponse);
    })();
  }, []);

  const fetchData = async () => {
    let response = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    return response.data;
  };

  return (
    <div className="admin-page-layout">
      {/* Searchbar */}
      <div className="searchBarLayout">
        <input
          type="text"
          placeholder="Search by name, email or role"
          id="searchText"
          className="searchBar"
          value={searchVal}
          onChange={(e) => {
            setSearchVal(e.target.value);
            let searchFilter = originalDataList.map((obj) => {
              if (
                obj.name.match(e.target.value) ||
                obj.email.match(e.target.value) ||
                obj.role.match(e.target.value)
              )
                return obj;

              return null;
            });
            let newMatchedList = [];
            searchFilter.forEach((obj) => {
              if (obj !== null) {
                newMatchedList.push(obj);
              }
            });
            setDataList(newMatchedList);
          }}
        />
      </div>

      <div className="table-layout">
        <table className="table-responsive">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  id="checkbox-0"
                  className="checkbox-size"
                  onClick={(e) => {
                    let rootCheckbox = document.querySelector(`#checkbox-0`);
                    let newList = [];
                    if (rootCheckbox.checked) {
                      dataList.forEach((obj) => {
                        let checkBoxElement = document.querySelector(
                          `#checkbox-${obj.id}`
                        );
                        checkBoxElement.checked = true;
                        document
                          .querySelector(`#table-${obj.id}`)
                          .setAttribute("style", "background-color: grey;");
                        newList.push(obj.id);
                      });
                    } else {
                      dataList.forEach((obj) => {
                        let checkBoxElement = document.querySelector(
                          `#checkbox-${obj.id}`
                        );
                        checkBoxElement.checked = false;
                        document
                          .querySelector(`#table-${obj.id}`)
                          .removeAttribute("style");
                        let ind = newList.indexOf(obj.id);
                        newList.splice(ind, 1);
                      });
                    }

                    setDeletedRowList(newList);
                  }}
                ></input>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length !== 0 &&
              dataList.map((data) => {
                return (
                  <TableList
                    key={data.id}
                    tableData={data}
                    handleEditRow={(e) => {
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
                    handleSaveRow={(e) => {
                      let new_name = document.getElementById(`name_text`).value;
                      let new_email =
                        document.getElementById(`email_text`).value;
                      let new_role = document.getElementById(`role_text`).value;

                      document.getElementById(`name-${e.target.id}`).innerHTML =
                        new_name;
                      document.getElementById(
                        `email-${e.target.id}`
                      ).innerHTML = new_email;
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
                      setOriginalDataList(newList);
                    }}
                    handleDeletedRow={(e) => {
                      let newList = [];
                      dataList.forEach((obj) => {
                        if (obj.id !== e.target.id) {
                          newList.push(obj);
                        }
                      });
                      setDataList(newList);
                      setOriginalDataList(newList);
                    }}
                    deleteRowsList={deletedRowList}
                    setDeletedRows={setDeletedRowList}
                  />
                );
              })}
          </tbody>
        </table>
      </div>

      <Pagination
        handleDeletedClick={() => {
          let newList = [];
          dataList.forEach((obj) => {
            if (!deletedRowList.includes(obj.id)) {
              newList.push(obj);
            }
          });

          if (document.querySelector(`#checkbox-0`).checked)
            document.querySelector(`#checkbox-0`).checked = false;

          setDataList(newList);
          setOriginalDataList(newList);
        }}
      />
    </div>
  );
};

export default AdminPage;
