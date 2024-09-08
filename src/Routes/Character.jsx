import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero2stan from "../pictures/Hero2stan.png";

const Character = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const idToGet = useParams();
  const idCharac = idToGet.id;

  useEffect(() => {
    const getCharac = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--dk2vmt6fnyjp.code.run/character/${idCharac}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCharac();
  }, []);

  return (
    <>
      <Header />
      <section className="Stan-quote">
        <div className="pic-quote">
          <img src={Hero2stan} alt="Stan Lee picture" />
        </div>
        <div className="quotation">
          <p>
            "I have always included minority characters in my stories, often as
            heroes."
            <br />
            <span>Stan Lee</span>
          </p>
        </div>
      </section>
      {!loading && (
        <section id="onewidecharac">
          <div id="onewidecharac-pic">
            <img
              src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
              alt="superhero portrait"
            />
          </div>
          <section className="onecharac-desc">
            <h2>{data.name}</h2>
            {data.description && <p>{data.description}</p>}
          </section>
        </section>
      )}
      <Footer />
    </>
  );
};
export default Character;
