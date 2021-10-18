import "./NavBar.scss";

// import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = ({ page, setPage, skip, setSkip, limit, setSearch, data }) => {
  return (
    <div className="fond-nav-bar">
      {page > 1 ? (
        <FontAwesomeIcon
          className="left-right"
          icon="angle-left"
          onClick={() => {
            setPage(page - 1);
            setSkip(skip - limit);
          }}
        />
      ) : null}
      <div className="search-bar">
        <input
          className="search"
          type="search"
          placeholder="Search ..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {page * limit < data.count ? (
        <FontAwesomeIcon
          className="left-right"
          icon="angle-right"
          onClick={() => {
            setPage(page + 1);
            setSkip(skip + limit);
          }}
        />
      ) : null}
    </div>
  );
};
export default NavBar;
