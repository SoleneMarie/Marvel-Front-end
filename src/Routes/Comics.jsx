import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero2stan from "../pictures/Hero2stan.png";
import axios from "axios";
import ArrowLeft from "../pictures/ArrowLeft.png";
import ArrowRight from "../pictures/ArrowRight.png";

const Comics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagenumcomic, setPagenumcomic] = useState(1);
  const [lastPagecomic, setLastPagecomic] = useState(1);
  let limitcomic = 100;

  let countcomic = 0;

  useEffect(() => {
    const getComics = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?limit=${limitcomic}&page=${pagenumcomic}`
        );
        countcomic = response.data.count;

        setData(response.data.results);

        if (countcomic % limitcomic === 0) {
          setLastPagecomic(countcomic / limitcomic);
        } else {
          setLastPagecomic(Math.trunc(countcomic / limitcomic + 1));
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getComics();
  }, [pagenumcomic]);

  console.log(lastPagecomic);
  console.log(pagenumcomic);

  return (
    <>
      <Header />
      <p>Page des comics</p>
      <section className="Stan-quote">
        <div className="pic-quote">
          <img src={Hero2stan} alt="Stan Lee picture" />
        </div>
        <div className="quotation">
          <p>
            "Face front, true believers!"
            <br />
            <span>Stan Lee</span>
          </p>
        </div>
      </section>
      {!loading ? (
        <section id="allcomics-sec">
          {data.map((comic) => {
            return (
              <section className="onecomic-sec" key={comic._id}>
                <div className="onecomicpic-main>">
                  <Link to={`/comic/${comic._id}`}>
                    <img
                      src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
                    />
                  </Link>
                </div>
                <h2> {comic.title}</h2>
              </section>
            );
          })}

          <div className="arrows">
            {pagenumcomic === 1 ? (
              <img
                src={ArrowRight}
                onClick={() => setPagenumcomic(pagenumcomic + 1)}
              />
            ) : pagenumcomic === lastPagecomic ? (
              <img
                src={ArrowLeft}
                onClick={() => setPagenumcomic(pagenumcomic - 1)}
              />
            ) : (
              <div className="botharrows">
                <img
                  src={ArrowLeft}
                  onClick={() => setPagenumcomic(pagenumcomic - 1)}
                />
                <img
                  src={ArrowRight}
                  onClick={() => setPagenumcomic(pagenumcomic + 1)}
                />
              </div>
            )}
          </div>
        </section>
      ) : (
        <main>
          <p>Chargement en cours, veuillez patienter...</p>
        </main>
      )}
      <Footer />
    </>
  );
};

export default Comics;
