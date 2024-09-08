import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero2stan from "../pictures/Hero2stan.png";
import axios from "axios";
import ArrowLeft from "../pictures/ArrowLeft.png";
import ArrowRight from "../pictures/ArrowRight.png";
import Cookies from "js-cookies";

const Comics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagenumcomic, setPagenumcomic] = useState(1);
  const [lastPagecomic, setLastPagecomic] = useState(1);
  const [cookieArrcomic, setCookieArrComic] = useState([]);
  const [comicSearch, setComicSearch] = useState("");
  let limitcomic = 100;
  let copyArrComic = [];
  let countcomic = 0;

  useEffect(() => {
    if (Cookies.getItem("favorite-comics")) {
      setCookieArrComic(Cookies.getItem("favorite-comics").split(","));
    }
  }, []);

  useEffect(() => {
    const getComics = async () => {
      try {
        const response = await axios.get(
          `http://site--marvel-backend--dk2vmt6fnyjp.code.run/comics?title=${comicSearch}&limit=${limitcomic}&page=${pagenumcomic}`
        );
        countcomic = response.data.count;
        console.log(comicSearch);

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
  }, [pagenumcomic] && [comicSearch]);

  useEffect(() => {
    if (cookieArrcomic.length > 0) {
      Cookies.setItem("favorite-comics", [cookieArrcomic], { expires: 30 });
    }
  }, [cookieArrcomic]);

  console.log(lastPagecomic);
  console.log(pagenumcomic);

  const CookieArrComicSet = (id) => {
    if (!cookieArrcomic.includes(id)) {
      copyArrComic = [...cookieArrcomic];
      copyArrComic.push(id);
      setCookieArrComic(copyArrComic);
    }
  };

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
        <>
          <section id="comic-search">
            <input
              type="text"
              id="searchComic"
              name="searchComic"
              placeholder="What are you looking for?"
              onChange={(event) => setComicSearch(event.target.value)}
            />
          </section>

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
                    <div onClick={() => CookieArrComicSet(comic._id)}>like</div>
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
        </>
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
