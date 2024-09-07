import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero2stan from "../pictures/Hero2stan.png";

const Comic = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const idToGet = useParams();
  const idComic = idToGet.id;

  useEffect(() => {
    const getComic = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comic/${idComic}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getComic();
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
            "Comics are stories; they're like novels or anything else. So the
            first thing you have to do is become a good storyteller."
            <br />
            <span>Stan Lee</span>
          </p>
        </div>
      </section>
      {!loading && (
        <section id="onewidecomic">
          <div id="widecomic-pic">
            <img
              src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
            />
          </div>
          <div id="onewidecomic-desc">
            <h2>{data.title}</h2>
            {data.description ? (
              <p>{data.description}</p>
            ) : (
              <p>No summary available, but it must be amazing!</p>
            )}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};
export default Comic;
