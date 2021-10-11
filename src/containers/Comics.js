// packages
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLoading, Puff } from "@agney/react-loading";

// components
import NavBar from "../components/NavBar";
import SkipBar from "../components/SkipBar";

// Import Images
import HulkHandblack from "../assets/images/Hulk-Hand-black.png";
import HulkHandgreen from "../assets/images/Hulk-Hand-green.png";

const Comics = () => {
  // Loader
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

  let favorisComics = false;

  // State which allows you to restart the request when the content of the cookie changes
  const [reloadRequestFavoris, setReloadRequestFavoris] = useState(false);
  const handleFavorite = (comics) => {
    // I test if the id of each mapped comic book is present in my cookie
    reloadRequestFavoris
      ? setReloadRequestFavoris(false)
      : setReloadRequestFavoris(true);

    let newTabFavoris = [];
    let existAlready = false;

    // if a cookie exists
    if (typeof Cookies.get("FavorisComics") === "undefined") {
      // push comics
      newTabFavoris.push(comics);
      // I add this array in the cookie
      Cookies.set("FavorisComics", newTabFavoris);
    } else {
      // parse to treat it as the array
      newTabFavoris = JSON.parse(Cookies.get("FavorisComics"));
      // I look in my object array if the comic book is already present
      for (let i = 0; i < newTabFavoris.length; i++) {
        if (newTabFavoris[i]._id === comics._id) {
          // If the id is already present, then I pass my variable to true
          existAlready = true;
          // I delete this comic book from my cookie
          newTabFavoris.splice(i, 1);
          // I insert my new table with the deleted comics in the cookie
          Cookies.set("FavorisComics", newTabFavoris);
        }
      }

      // If the id is not already present
      if (existAlready === false) {
        // I then add my comics in my array
        newTabFavoris.push(comics);
        // and in my cookie
        Cookies.set("FavorisComics", newTabFavoris);
      }
    }
  };

  // I make a request to my backend and I store the data received in the state data
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
    <section {...containerProps}>{indicatorEl}</section>
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

      <div className="comics-wrapped">
        {data.results.map((comics, index) => {
          favorisComics = false;
          // if the id of my current comic book is present in the cookie
          if (typeof Cookies.get("FavorisComics") !== "undefined") {
            let cookie = JSON.parse(Cookies.get("FavorisComics"));
            for (let y = 0; y < cookie.length; y++) {
              // If the id of the currently mapped comic book is present in the cookie, I pass the variable to true
              if (cookie[y]._id === comics._id) {
                // If the variable turns to true, then my star color turns into valid
                favorisComics = true;
              }
            }
          }

          const noImage = `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`;

          // I am using a regex to search the string for all the html tags and I delete these tag

          let htmlTagRegexp = /<\w+>|<\/\w+>/g;

          function removeHTMLTag(data) {
            if (htmlTagRegexp.test(data)) {
              data = data.replace(htmlTagRegexp, "");
              return data;
            } else {
              return data;
            }
          }
          let newDescription = removeHTMLTag(comics.description);

          return (
            <div key={comics._id}>
              {(comics.thumbnail.path === noImage &&
                comics.description === null) ||
              (comics.thumbnail.path === noImage &&
                comics.description === "") ? (
                <div></div>
              ) : (
                <div className="comics-cards">
                  <div className="sectionLeft">
                    <div
                      className="comics-fav"
                      onClick={() => handleFavorite(comics)}
                    >
                      {favorisComics ? (
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
                    <span>{comics.title}</span>

                    {comics.thumbnail.path === noImage ? (
                      <div
                        style={{
                          height: 450,
                          width: 300,
                          margin: 20,
                          color: "white",
                          fontSize: 25,
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "black",
                        }}
                      >
                        Image non disponible dans la base de donnée.
                      </div>
                    ) : (
                      <img
                        className="img-comics"
                        src={
                          comics.thumbnail.path +
                          "." +
                          comics.thumbnail.extension
                        }
                        alt={comics.title}
                      />
                    )}
                  </div>
                  <div className="sectionRight">
                    {comics.description === null ||
                    comics.description === "" ? (
                      <div
                        style={{
                          margin: 20,
                          color: "white",
                          fontSize: 25,
                          textAlign: "center",
                        }}
                      >
                        Non disponible dans la base de donnée.
                      </div>
                    ) : (
                      <div>
                        {newDescription < 1000
                          ? `${newDescription}`
                          : `${newDescription.substring(0, 1000)}...`}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <SkipBar setLimit={setLimit} />
    </div>
  );
};

export default Comics;
