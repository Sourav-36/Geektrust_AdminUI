import "./pagination.css";

const Pagination = ({ handleDeletedClick }) => {
  return (
    <footer className="footer-layout">
      <div className="button-layout">
        <button
          type="button"
          className="delete-button"
          onClick={handleDeletedClick}
        >
          Delete selected
        </button>
      </div>
    </footer>
  );
};

export default Pagination;
