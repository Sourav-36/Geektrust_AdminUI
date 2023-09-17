import "./footer.css";

const Footer = ({ handleDeletedClick, dataList }) => {
  let showButtons = (data) => {
    let noOfData = 10;
    let noOfPages = Math.ceil(data.length / noOfData);
    let buttonsValue = [];
    for (let i = 1; i <= noOfPages; i++) {
      buttonsValue.push(i);
    }

    return buttonsValue;
  };

  return (
    <div className="footer-layout">
      <div className="delete-button-layout">
        <button
          type="button"
          className="delete-button"
          onClick={handleDeletedClick}
        >
          Delete selected
        </button>
      </div>

      <div className="page-button-layout" id="pagination-container">
        <button className="page-button">First</button>
        <button className="page-button">Prev</button>
        {showButtons(dataList).length !== 0 &&
          showButtons(dataList).map((val) => {
            return (
              <button key={val} className="page-button" id={`button-${val}`}>
                {val}
              </button>
            );
          })}
        <button className="page-button">Next</button>
        <button className="page-button">Last</button>
      </div>
    </div>
  );
};

export default Footer;
