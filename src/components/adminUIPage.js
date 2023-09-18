import "./adminUIPage.css";
import TableList from "./tablelist.js";
import Footer from "./footer.js";
import { useState, useEffect } from "react";

const AdminPage = () => {
  let [originalDataList, setOriginalDataList] = useState([]);
  let [dataList, setDataList] = useState([]);
  let [searchVal, setSearchVal] = useState("");
  let [deletedRowList, setDeletedRowList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);

  const paginateData = (data, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };

  const fetchData = async () => {
    let response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    return response.json();
  };

  useEffect(() => {
    (async () => {
      let jsonResponse = await fetchData();
      setDataList(jsonResponse);
      setTotalItems(jsonResponse.length);
      setOriginalDataList(jsonResponse);
    })();
  }, []);

  useEffect(() => {
    const newData = paginateData(dataList, currentPage, itemsPerPage);
    setPaginatedData(newData);
  }, [currentPage, dataList]);

  return (
    <div className="admin-page-layout">
      <div className="searchbar-layout">
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
            setCurrentPage(1);
            setTotalItems(newMatchedList.length);
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
                      paginatedData.forEach((obj) => {
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
                      paginatedData.forEach((obj) => {
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
            {paginatedData.length !== 0 &&
              paginatedData.map((data) => {
                return (
                  <TableList
                    key={data.id}
                    tableData={data}
                    dataList={dataList}
                    setDataList={setDataList}
                    setOriginalDataList={setOriginalDataList}
                    setCurrentPage={setCurrentPage}
                    setTotalItems={setTotalItems}
                    deleteRowsList={deletedRowList}
                    setDeletedRows={setDeletedRowList}
                  />
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="footer-layout">
        <Footer
          dataList={dataList}
          setDataList={setDataList}
          deletedRowList={deletedRowList}
          setOriginalDataList={setOriginalDataList}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          paginatedData={dataList}
          totalItems={totalItems}
          setTotalItems={setTotalItems}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default AdminPage;
