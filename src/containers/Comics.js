import { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "js-cookie";

import NavBar from "../components/NavBar";
import SkipBar from "../components/SkipBar";

const Comics = () => {
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
          `https://marvel-backend-luc.herokuapp.com/comics/?title=${search}&skip=${skip}&limit=${limit}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData(search);
  }, [search, skip, limit]);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="comics-container">
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
        {data.results.map((comics, index) => {
          const favoris = () => {
            let tab = [];
            tab.push({ comics });
            // console.log(tab[0].comics._id);
            let newTab = [];
            newTab = tab[0].comics._id;
            // console.log(newTab);

            let string = newTab.toString();

            let newstring = JSON.stringify(string);
            console.log(newstring);
            Cookies.set(newstring);
          };
          return (
            <div className="comics" key={comics._id}>
              <button onClick={favoris}>fav</button>
              <span>{comics.title}</span>
              <img
                src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                alt={comics.title}
              />
            </div>
          );
        })}
      </div>
      <SkipBar setLimit={setLimit} />
    </div>
  );
};

export default Comics;
