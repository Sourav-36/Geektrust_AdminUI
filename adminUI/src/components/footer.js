import "./footer.css";

const Footer = ({
  // handleDeletedClick,
  dataList,
  setDataList,
  deletedRowList,
  setOriginalDataList,
  currentPage,
  setCurrentPage,
  totalItems,
  setTotalItems,
  itemsPerPage,
}) => {
  const showButtons = (totalItems, itemsPerPage) => {
    const noOfPages = Math.ceil(totalItems / itemsPerPage);
    const buttonsValue = [];
    for (let i = 1; i <= noOfPages; i++) {
      buttonsValue.push(i);
    }
    return buttonsValue;
  };

  return (
    <>
      <div className="delete-button-layout">
        <button
          type="button"
          className="delete-button"
          onClick={() => {
            let newList = [];
            dataList.forEach((obj) => {
              if (!deletedRowList.includes(obj.id)) {
                newList.push(obj);
              }
            });

            if (document.querySelector(`#checkbox-0`).checked)
              document.querySelector(`#checkbox-0`).checked = false;

            setDataList(newList);
            setCurrentPage(1);
            setOriginalDataList(newList);
            setTotalItems(newList.length);
          }}
        >
          Delete selected
        </button>
      </div>

      <div className="page-button-layout" id="pagination-container">
        <button
          className="page-button"
          onClick={() => {
            if (document.querySelector(`#checkbox-0`).checked)
              document.querySelector(`#checkbox-0`).checked = false;
            setCurrentPage(1);
          }}
        >
          First
        </button>
        <button
          className="page-button"
          onClick={() => {
            if (document.querySelector(`#checkbox-0`).checked)
              document.querySelector(`#checkbox-0`).checked = false;
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {showButtons(totalItems, itemsPerPage).map((val) => (
          <button
            key={val}
            className={`page-button ${val === currentPage ? "active" : ""}`}
            onClick={() => {
              if (document.querySelector(`#checkbox-0`).checked)
                document.querySelector(`#checkbox-0`).checked = false;
              setCurrentPage(val);
            }}
          >
            {val}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => {
            if (document.querySelector(`#checkbox-0`).checked)
              document.querySelector(`#checkbox-0`).checked = false;
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        >
          Next
        </button>
        <button
          className="page-button"
          onClick={() => {
            if (document.querySelector(`#checkbox-0`).checked)
              document.querySelector(`#checkbox-0`).checked = false;
            setCurrentPage(Math.ceil(totalItems / itemsPerPage));
          }}
        >
          Last
        </button>
      </div>
    </>
  );
};

export default Footer;
