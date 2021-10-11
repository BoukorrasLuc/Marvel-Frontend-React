import "./Favoris.scss";

// packages
import Cookies from "js-cookie";
import { useState } from "react";

// Import Images
import HulkHandblack from "../../assets/images/Hulk-Hand-black.png";
import HulkHandgreen from "../../assets/images/Hulk-Hand-green.png";

const Favoris = ({
  setErrorComics,
  errorComics,
  errorCharacter,
  setErrorCharacter,
}) => {
  // Variable to change favorites
  let favoris = false;
  let favorisComics = false;
  // Creation of the empty array, which will store the cookie array
  let newTabFavoris;
  let newTabFavorisComics;
  // I create a state to relaunch my page each time the cookie is changed
  const [reloadFavoris, setReloadFavoris] = useState(false);

  Cookies.get("FavorisCharacters")
    ? (newTabFavoris = JSON.parse(Cookies.get("FavorisCharacters")))
    : (newTabFavoris = []);
  Cookies.get("FavorisComics")
    ? (newTabFavorisComics = JSON.parse(Cookies.get("FavorisComics")))
    : (newTabFavorisComics = []);

  // Function to add / remove a character / comics in fav
  const handleFavorite = (elem, from) => {
    let isAlreadyExist = false;
    // Click to add / remove a favorite character
    if (from === "character") {
      // I test if the cookie is full
      if (newTabFavoris.length === 0) {
        // If it is empty, I push my first character to the table
        newTabFavoris.push(elem);
        // I then add this array in the cookie
        Cookies.set("FavorisCharacters", newTabFavoris);
      } else {
        // I look in my object array if the character is already present
        for (let i = 0; i < newTabFavoris.length; i++) {
          if (newTabFavoris[i]._id === elem._id) {
            // the id is already present, so i pass my variable to true / THEREFORE DELETE FAVORITES
            isAlreadyExist = true;
            // This means that i want to delete this character from my cookie
            newTabFavoris.splice(i, 1);
            // I insert my new array with the deleted character in the cookie
            Cookies.set("FavorisCharacters", newTabFavoris);
          }
        }
      } // the id is not already present / So ADD FAVORITES
      if (isAlreadyExist === false) {
        // I then add my character in my array
        newTabFavoris.push(elem);
        // I insert my new array with the new character in the cookie
        Cookies.set("FavorisCharacters", newTabFavoris);
      }
    } else {
      // I insert my new array with the new character in the cookie
      if (newTabFavorisComics.length === 0) {
        newTabFavorisComics.push(elem);
        Cookies.set("FavorisComics", newTabFavorisComics);
      } else {
        for (let i = 0; i < newTabFavorisComics.length; i++) {
          if (newTabFavorisComics[i]._id === elem._id) {
            isAlreadyExist = true;
            newTabFavorisComics.splice(i, 1);
            Cookies.set("FavorisComics", newTabFavorisComics);
          }
        }
      }
      if (isAlreadyExist === false) {
        newTabFavorisComics.push(elem);
        Cookies.set("FavorisComics", newTabFavorisComics);
      }
    }
    // Each click, I relaunch my page, to update the display of favorites
    reloadFavoris ? setReloadFavoris(false) : setReloadFavoris(true);
  };

  return (
    <>
      <div className="favoris-container">
        {/* If no favorite character in the cookie */}
        {!Cookies.get("FavorisCharacters") ||
        Cookies.get("FavorisCharacters") === "[]" ? (
          <div style={{ height: "100vh" }}>
            {setErrorCharacter("Aucun résultat de personnages")}
            <span
              style={{
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10px",
                color: "black",
              }}
            >
              {errorCharacter}
            </span>
          </div>
        ) : (
          <>
            {/* If there are personal favorites in the cookie */}

            {setErrorCharacter("")}

            {newTabFavoris.map((character, i) => {
              // I put the variable which will define if the id of the character is present in the cookie to false
              favoris = false;
              // I search in the cookie if the id of my character is present
              for (let y = 0; y < newTabFavoris.length; y++) {
                if (newTabFavoris[y]._id === character._id) {
                  // If the id of the currently mapped character is present in the cookie, I pass the variable to true
                  favoris = true;
                }
              }
              return (
                <div className="favoris-characters" id={character._id} key={i}>
                  <div className="card">
                    <div onClick={() => handleFavorite(character, "character")}>
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
                    <span>{character.name}</span>
                    <img
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                    />
                    <span style={{ fontSize: "15px" }}>
                      {character.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div className="favoris-comics">
          {!Cookies.get("FavorisComics") ||
          Cookies.get("FavorisComics") === "[]" ? (
            <div style={{ height: "100vh" }}>
              {setErrorComics("Aucun résultat de comics")}
              <span
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10px",
                  color: "black",
                }}
              >
                {errorComics}
              </span>
            </div>
          ) : (
            <>
              {setErrorComics("")}

              {newTabFavorisComics.map((comic, i) => {
                favorisComics = false;

                for (let y = 0; y < newTabFavorisComics.length; y++) {
                  if (newTabFavorisComics[y]._id === comic._id) {
                    favorisComics = true;
                  }
                }

                return (
                  <div className="favoris-comics" id={comic._id} key={i}>
                    <div className="card">
                      <div onClick={() => handleFavorite(comic, "comics")}>
                        {favorisComics ? (
                          <img
                            src={HulkHandgreen}
                            alt=""
                            style={{
                              height: "20px",
                              width: "20px",
                            }}
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
                      <span>{comic.title}</span>
                      <img
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.name}
                      />

                      <span style={{ fontSize: "15px" }}>
                        {comic.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Favoris;
