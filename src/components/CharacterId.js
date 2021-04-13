import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CharacterId = () => {
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
    <p>En cours de chargement...</p>
  ) : (
    <div className="characterid-container">
      <div>
        {data.comics.map((comics, index) => {
          return (
            <div className="comics" key={comics._id}>
              {comics.title}

              <span>{comics.title}</span>
              <img
                src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                alt={comics.title}
              />

              <span>{comics.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterId;
