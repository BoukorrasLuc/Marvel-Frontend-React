// Scss
import "./Home.scss";

// Packages
import { Link } from "react-router-dom";

// Import Images
import thanos from "../../assets/images/1973-thanos-06.jpg";
import characters from "../../assets/images/avengers-vs-xmen.jpg";
import Comics from "../../assets/images/1973-thanos-08.jpg";
import Comics2 from "../../assets/images/marvel-iron-man-cover-i13712.jpg";

const Home = () => {
  return (
    <div className="home-container">
      <div className="containerEffect">
        {/* Link to the comics page with a css effect */}
        <Link to="/comics" style={{ textDecoration: "none" }} className="link">
          <div className="containerEffect1">
            <div className="Titre">Comics</div>
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
        <Link
          to="/characters"
          style={{ textDecoration: "none" }}
          className="link"
        >
          <div className="containerEffect2">
            <div className="Titre">Characters</div>
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
    </div>
  );
};
export default Home;
