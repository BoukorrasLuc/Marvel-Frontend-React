// Scss
import "./SkipBar.scss";

const SkipBar = ({ setLimit }) => {
  return (
    <div className="skip-bar">
      <button
        onClick={() => {
          setLimit(20);
        }}
      >
        [20]
      </button>
      <button
        onClick={() => {
          setLimit(50);
        }}
      >
        [50]
      </button>
      <button
        onClick={() => {
          setLimit(100);
        }}
      >
        [100]
      </button>
    </div>
  );
};

export default SkipBar;
