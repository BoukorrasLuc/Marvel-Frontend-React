// Scss
import "./Characters.scss";

// packages
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLoading, Puff } from "@agney/react-loading";

// components
import NavBar from "../../components/NavBar/NavBar";
import SkipBar from "../../components/SkipBar/SkipBar";
import CharactersWrapped from "../../components/CharactersWrapped";

// Import Images
import HulkHandblack from "../../assets/images/Hulk-Hand-black.png";
import HulkHandgreen from "../../assets/images/Hulk-Hand-green.png";
import Info from "../../assets/images/iconmonstr-info-thin-240.png";

const Characters = ({ userToken, reveleModaleSignUp, reveleModaleLogin }) => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="100" color="red" />,
  });

  // State to store the request data
  const [data, setData] = useState();
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

    // If a cookie exists
    if (typeof Cookies.get("FavorisCharacters") === "undefined") {
      // Push characters
      newTabFavoris.push(characters);
      // I add this array in the cookie
      Cookies.set("FavorisCharacters", newTabFavoris);
    } else {
      // Parse to treat it as the array
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
        // And in my cookie
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

      {reveleModaleLogin || reveleModaleSignUp ? (
        <CharactersWrapped
          data={data}
          Cookies={Cookies}
          favoris={favoris}
          Info={Info}
          userToken={userToken}
          handleFavorite={handleFavorite}
          HulkHandgreen={HulkHandgreen}
          HulkHandblack={HulkHandblack}
          newSize={newSizePixel}
          overflow="hidden"
        />
      ) : (
        <CharactersWrapped
          data={data}
          Cookies={Cookies}
          favoris={favoris}
          Info={Info}
          userToken={userToken}
          handleFavorite={handleFavorite}
          HulkHandgreen={HulkHandgreen}
          HulkHandblack={HulkHandblack}
          newSize="100%"
          overflow=""
        />
      )}

      <SkipBar setLimit={setLimit} />
    </div>
  );
};
export default Characters;
