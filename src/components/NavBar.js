import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = (props) => {
  return (
    <div className="fond-nav-bar">
      {props.page > 1 ? (
        <FontAwesomeIcon
          className="left-right"
          icon="angle-left"
          onClick={() => {
            props.setPage(props.page - 1);
            props.setSkip(props.skip - props.limit);
          }}
        />
      ) : null}
      <div className="search-bar">
        <input
          className="search"
          type="search"
          placeholder="Rechercher ..."
          onChange={(e) => {
            props.setSearch(e.target.value);
          }}
        />
      </div>

      {props.page * props.limit < props.data.count ? (
        <FontAwesomeIcon
          className="left-right"
          icon="angle-right"
          onClick={() => {
            props.setPage(props.page + 1);
            props.setSkip(props.skip + props.limit);
          }}
        />
      ) : null}
    </div>
  );
};
export default NavBar;
