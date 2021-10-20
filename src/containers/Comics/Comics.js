// Scss
import "./Comics.scss";

// Packages
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLoading, Puff } from "@agney/react-loading";

// Components
import NavBar from "../../components/NavBar/NavBar";
import SkipBar from "../../components/SkipBar/SkipBar";
import ComicsWrapped from "../../components/ComicsWrapped";

// Import Images
import HulkHandblack from "../../assets/images/Hulk-Hand-black.png";
import HulkHandgreen from "../../assets/images/Hulk-Hand-green.png";

const Comics = ({ userToken, reveleModaleLogin, reveleModaleSignUp }) => {
  // Loader
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="100" color="red" />,
  });

  // State to store the request data
  const [data, setData] = useState();

  // State to Loading
  const [isLoading, setIsLoading] = useState(true);

  // State to store the data received in the input search
  const [search, setSearch] = useState("");

  // State to manage pagination
  const [limit, setLimit] = useState(20);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  // No Scroll if modal is open
  let windowSize = window.innerHeight;
  let newSize = windowSize - 214;
  let newSizePixel = `${newSize}px`;

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

    // If a cookie exists
    if (typeof Cookies.get("FavorisComics") === "undefined") {
      // Push comics
      newTabFavoris.push(comics);
      // I add this array in the cookie
      Cookies.set("FavorisComics", newTabFavoris);
    } else {
      // Parse to treat it as the array
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
        // And in my cookie
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

      {reveleModaleLogin || reveleModaleSignUp ? (
        <ComicsWrapped
          data={data}
          favorisComics={favorisComics}
          Cookies={Cookies}
          userToken={userToken}
          handleFavorite={handleFavorite}
          HulkHandblack={HulkHandblack}
          HulkHandgreen={HulkHandgreen}
          newSize={newSizePixel}
          overflow="hidden"
        />
      ) : (
        <ComicsWrapped
          data={data}
          favorisComics={favorisComics}
          Cookies={Cookies}
          userToken={userToken}
          handleFavorite={handleFavorite}
          HulkHandblack={HulkHandblack}
          HulkHandgreen={HulkHandgreen}
          newSize="100%"
          overflow=""
        />
      )}
      <SkipBar setLimit={setLimit} />
    </div>
  );
};

export default Comics;
