import "./CharacterId.scss";

// packages
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
      <div>
        {data.comics.map((comics) => {
          return (
            <div className="comics" key={comics._id}>
              <span>{comics.title}</span>
              <img
                src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                alt={comics.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterId;
