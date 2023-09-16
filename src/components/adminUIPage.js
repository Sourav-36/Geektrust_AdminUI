import "./adminUIPage.css";
import TableList from "./tableList.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./pagination.js";

const AdminPage = (props) => {
  let [originalDataList, setOriginalDataList] = useState([]);
  let [dataList, setDataList] = useState([]);
  let [deletedRowList, setDeletedRowList] = useState([]);
  let [searchVal, setSearchVal] = useState("");
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
            // console.log(searchFilter);
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
                    handleDeletedRow={(e) => {
                      let tableElement = document.querySelector(
                        `#table-${e.target.id}`
                      );
                      console.log(tableElement);
                      if (tableElement !== null) tableElement.remove();
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
          deletedRowList.forEach((id) => {
            let tableElement = document.querySelector(`#table-${id}`);
            if (tableElement !== null) tableElement.remove();
          });
        }}
      />
    </div>
  );
};

export default AdminPage;
