const ComicsWrapped = ({
  data,
  favorisComics,
  Cookies,
  userToken,
  handleFavorite,
  HulkHandblack,
  HulkHandgreen,
  newSize,
  overflow,
}) => {
  return (
    <div
      className="comics-wrapped"
      style={{ height: newSize, overflow: overflow }}
    >
      {data.results.map((comics, index) => {
        favorisComics = false;
        if (typeof Cookies.get("FavorisComics") !== "undefined") {
          let cookie = JSON.parse(Cookies.get("FavorisComics"));
          for (let y = 0; y < cookie.length; y++) {
            if (cookie[y]._id === comics._id) {
              favorisComics = true;
            }
          }
        }

        const noImage = `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available`;
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
            (comics.thumbnail.path === noImage && comics.description === "") ? (
              <></>
            ) : (
              <div className="comics-cards">
                <div className="sectionLeft">
                  {userToken ? (
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
                  ) : null}

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
                      Image non disponible dans la base de données.
                    </div>
                  ) : (
                    <img
                      className="img-comics"
                      src={
                        comics.thumbnail.path + "." + comics.thumbnail.extension
                      }
                      alt={comics.title}
                    />
                  )}
                </div>
                <div className="sectionRight">
                  {comics.description === null || comics.description === "" ? (
                    <div
                      style={{
                        margin: 20,
                        color: "white",
                        fontSize: 25,
                        textAlign: "center",
                      }}
                    >
                      Non disponible dans la base de données.
                    </div>
                  ) : (
                    <div>{newDescription.substring(0, 1000)}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ComicsWrapped;
