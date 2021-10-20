// Scss
import "./CharacterId.scss";

// Packages
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoading, Puff } from "@agney/react-loading";

const CharacterId = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff width="100" color="red" />,
  });

  const { characterId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-luc.herokuapp.com/comics/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <section {...containerProps}>{indicatorEl}</section>
  ) : (
    <div className="characterid-container">
      <div className="map-container">
        {data.comics.map((comics) => {
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
                <></>
              ) : (
                <div className="comics-cards">
                  <div className="sectionLeft">
                    <span>{comics.title}</span>

                    {comics.thumbnail.path === noImage ? (
                      <div className="noImage">
                        Image not available in the database.
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
                      <div className="noInfo">
                        Not available in the database.
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
    </div>
  );
};

export default CharacterId;
