import "./Home.scss";

// packages
import { Link } from "react-router-dom";

// Import Images
import thanos from "../../assets/images/1973-thanos-06.jpg";
import characters from "../../assets/images/avengers-vs-xmen.jpg";
import Comics from "../../assets/images/1973-thanos-08.jpg";
import Comics2 from "../../assets/images/marvel-iron-man-cover-i13712.jpg";

const Home = () => {
  return (
    <div className="home-container">
      {/* Link to the comics page with a css effect */}

      <Link to="/comics" style={{ textDecoration: "none" }}>
        <div className="containereffect1">
          {/* <div>Comics</div> */}
          <div className="card">
            <div className="front">
              <img alt="Comics" src={Comics} />
            </div>
            <div className="back">
              <img alt="Comics" src={Comics2} />
            </div>
          </div>
        </div>
      </Link>

      {/* Link to the characters page with a css effect */}

      <Link to="/characters" style={{ textDecoration: "none" }}>
        <div className="containereffect2">
          {/* <div>Personnages</div> */}
          <div className="card">
            <div className="front">
              <img alt="Comics" src={characters} />
            </div>
            <div className="back">
              <img alt="thanos" src={thanos} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Home;
