import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import SkipBar from "../components/SkipBar";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-luc.herokuapp.com/characters/?name=${search}&skip=${skip}&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search, skip, limit]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="characters-container">
      <NavBar
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        skip={skip}
        setSkip={setSkip}
        data={data}
        limit={limit}
      />
      <div>
        {data.results.map((characters, index) => {
          return (
            <Link
              className="characters"
              key={characters._id}
              to={`/character/${characters._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="name">{characters.name}</div>

              <img
                src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
                alt={characters.name}
              />
            </Link>
          );
        })}
      </div>
      <SkipBar setLimit={setLimit} />
    </div>
  );
};
export default Characters;
