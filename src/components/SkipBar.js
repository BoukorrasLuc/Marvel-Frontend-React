const SkipBar = (props) => {
  return (
    <div className="skip-bar">
      <button
        onClick={() => {
          props.setLimit(20);
        }}
      >
        [20]
      </button>
      <button
        onClick={() => {
          props.setLimit(50);
        }}
      >
        [50]
      </button>
      <button
        onClick={() => {
          props.setLimit(100);
        }}
      >
        [100]
      </button>
    </div>
  );
};

export default SkipBar;
