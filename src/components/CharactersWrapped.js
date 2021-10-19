// Packages
import { Link } from "react-router-dom";

const CharactersWrapped = ({
  Cookies,
  favoris,
  Info,
  userToken,
  handleFavorite,
  HulkHandgreen,
  HulkHandblack,
  newSize,
  overflow,
  data,
}) => {
  return (
    <div
      className="characters-wrapped"
      style={{ height: newSize, overflow: overflow }}
    >
      {data.results.map((characters, index) => {
        favoris = false;
        // If the id of my current comic book is present in the cookie
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
          <div className="characters-cards" key={characters._id}>
            <div className="top-cards">
              {characters.comics.length === 0 ? (
                <Link
                  className="topConditionImgInfoOne"
                  to={`/character/${characters._id}`}
                ></Link>
              ) : (
                <Link
                  className="topConditionImgInfoTwo"
                  to={`/character/${characters._id}`}
                >
                  <img src={Info} alt="" />
                </Link>
              )}

              {userToken ? (
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
              ) : null}
            </div>

            <div className="name">{characters.name}</div>

            {characters.thumbnail.path === noImage ? (
              <div className="noImage">
                Image not available in the database.
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
  );
};

export default CharactersWrapped;
