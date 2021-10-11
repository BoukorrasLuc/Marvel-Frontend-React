import "./Characters.scss";

// packages
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useLoading, Puff } from "@agney/react-loading";

// components
import NavBar from "../../components/NavBar/NavBar";
import SkipBar from "../../components/SkipBar/SkipBar";

// Import Images
import HulkHandblack from "../../assets/images/Hulk-Hand-black.png";
import HulkHandgreen from "../../assets/images/Hulk-Hand-green.png";
import Info from "../../assets/images/iconmonstr-info-thin-240.png";

const Characters = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="100" color="red" />,
  });

  // state to store the request data
  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(true);

  // State to store the data received in the input search
  const [search, setSearch] = useState("");

  // State to manage pagination
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  let favoris = false;

  // State which allows you to restart the request when the content of the cookie changes
  const [reloadRequestFavoris, setReloadRequestFavoris] = useState(false);
  const handleFavorite = (characters) => {
    // I test if the id of each mapped comic book is present in my cookie
    reloadRequestFavoris
      ? setReloadRequestFavoris(false)
      : setReloadRequestFavoris(true);

    let newTabFavoris = [];
    let existAlready = false;

    // if a cookie exists
    if (typeof Cookies.get("FavorisCharacters") === "undefined") {
      // push characters
      newTabFavoris.push(characters);
      // I add this array in the cookie
      Cookies.set("FavorisCharacters", newTabFavoris);
    } else {
      // parse to treat it as the array
      newTabFavoris = JSON.parse(Cookies.get("FavorisCharacters"));
      // I look in my object array if the comic book is already present
      for (let i = 0; i < newTabFavoris.length; i++) {
        if (newTabFavoris[i]._id === characters._id) {
          // If the id is already present, then I pass my variable to true
          existAlready = true;
          // I delete this comic book from my cookie
          newTabFavoris.splice(i, 1);
          // I insert my new table with the deleted characters in the cookie
          Cookies.set("FavorisCharacters", newTabFavoris);
        }
      }

      // If the id is not already present
      if (existAlready === false) {
        // I then add my characters in my array
        newTabFavoris.push(characters);
        // and in my cookie
        Cookies.set("FavorisCharacters", newTabFavoris);
      }
    }
  };

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
    <section {...containerProps}>{indicatorEl}</section>
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
          favoris = false;
          // if the id of my current comic book is present in the cookie
          if (typeof Cookies.get("FavorisCharacters") !== "undefined") {
            let cookie = JSON.parse(Cookies.get("FavorisCharacters"));
            for (let y = 0; y < cookie.length; y++) {
              // If the id of the currently mapped comic book is present in the cookie, I pass the variable to true
              if (cookie[y]._id === characters._id) {
                // If the variable turns to true, then my star color turns into valid
                favoris = true;
              }
            }
          }

          const noImage = `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`;

          return (
            <div className="characters" key={characters._id}>
              <div>
                {characters.comics.length === 0 ? (
                  <Link
                    to={`/character/${characters._id}`}
                    style={{ textDecoration: "none" }}
                  ></Link>
                ) : (
                  <Link
                    to={`/character/${characters._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={Info}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  </Link>
                )}
                <div onClick={() => handleFavorite(characters)}>
                  {favoris ? (
                    <img
                      src={HulkHandgreen}
                      alt=""
                      style={{ height: "20px", width: "20px" }}
                    />
                  ) : (
                    <img
                      src={HulkHandblack}
                      alt=""
                      style={{
                        height: "20px",
                        width: "20px",
                        backgroundColor: "#b60304",
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="name">{characters.name}</div>

              {characters.thumbnail.path === noImage ? (
                <div
                  style={{
                    height: 300,
                    width: 300,
                    margin: 20,
                    color: "red",
                    fontSize: 15,
                  }}
                >
                  Image non disponible dans la base de donnée.
                </div>
              ) : (
                <img
                  src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
                  alt={characters.name}
                />
              )}
            </div>
          );
        })}
      </div>
      <SkipBar setLimit={setLimit} />
    </div>
  );
};
export default Characters;
