import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookies";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero2stan from "../pictures/Hero2stan.png";

const Favorites = () => {
  const [CookiesArrComics, setCookiesArrComics] = useState([]);
  const [CookiesArrCharacs, setCookiesArrCharacs] = useState([]);
  const [dataComics, setDataComics] = useState({});
  const [dataCharac, setDataCharac] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingCharac, setLoadingCharac] = useState(true);
  /* ----------------------------------Fonction pour récupérer le data des comics ---------------------------*/
  const getComicsFunc = async () => {
    try {
      const comics = [];
      if (CookiesArrComics.length > 0) {
        for (let i = 0; i < CookiesArrComics.length; i++) {
          let id = CookiesArrComics[i];
          let response = await axios.get(
            `http://site--marvel-backend--dk2vmt6fnyjp.code.run/comic/${id}`
          );
          comics.push(response.data);
        }
        setDataComics(comics);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ------------------------------Fonction pour récupérer le data des personnages ------------------------- */

  const getCharacFunc = async () => {
    try {
      const characs = [];
      if (CookiesArrCharacs.length > 0) {
        for (let i = 0; i < CookiesArrCharacs.length; i++) {
          let id = CookiesArrCharacs[i];
          let response = await axios.get(
            `http://site--marvel-backend--dk2vmt6fnyjp.code.run/character/${id}`
          );
          characs.push(response.data);
        }
        setDataCharac(characs);
        setLoadingCharac(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /* -------------------------------UseEffect pour récupérer mon tableau de cookies -------------------------*/
  useEffect(() => {
    if (Cookies.getItem("favorite-comics")) {
      setCookiesArrComics(Cookies.getItem("favorite-comics").split(","));
    }
    if (Cookies.getItem("favorite-characs")) {
      setCookiesArrCharacs(Cookies.getItem("favorite-characs").split(","));
    }
  }, []);

  /* -------------------------UseEffect pour appeler la fonction qui récupère le data des comics, --------------
  -----------------------------------lorsque le state cookiesArrComics change -------------------------------------- */

  useEffect(() => {
    getComicsFunc();
  }, [CookiesArrComics]);

  /* -------------------------UseEffect pour appeler la fonction qui récupère le data des personnages, --------------
  -----------------------------------lorsque le state cookiesArrCharacs change -------------------------------------- */
  useEffect(() => {
    getCharacFunc();
  }, [CookiesArrCharacs]);

  /* --------------------------------UseEffects pour console.log ---------------------------------- */
  useEffect(() => {
    console.log(dataCharac);
  }, [dataCharac]);

  useEffect(() => {
    console.log(dataComics);
  }, [dataComics]);

  return (
    <>
      <Header />
      <main>
        <section id="presentation-fav">
          <h1>Your favorite comic material is right here!</h1>
          <section className="Stan-quote">
            <div className="pic-quote">
              <img src={Hero2stan} alt="Stan Lee picture" />
            </div>
            <div className="quotation">
              <p>
                "Marvel Studios has depicted the Marvel superheroes so
                beautifully that the whole world loves them."
                <br />
                <span>Stan Lee</span>
              </p>
            </div>
          </section>
        </section>

        <section id="allfavorites">
          <section id="favorite-characs">
            {dataCharac.length > 0 ? (
              dataCharac.map((charac) => {
                return (
                  <>
                    <section className="one-favorite-charac">
                      <div className="favorite-charac-picture">
                        <img
                          src={`${charac.thumbnail.path}/portrait_medium.${charac.thumbnail.extension}`}
                          alt="hero-picture"
                        />
                      </div>
                      <div className="favorite-charac-description">
                        <h2>{charac.name}</h2>
                        <p>{charac.description}</p>
                      </div>
                    </section>
                  </>
                );
              })
            ) : (
              <p>Whoops, you haven't picked any character yet!</p>
            )}
          </section>

          <section id="favorite-comics">
            {dataComics.length > 0 ? (
              <section className="one-favorite-comic">
                {dataComics.map((comic) => {
                  return (
                    <>
                      <div className="favorite-comic-picture">
                        <img
                          src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
                          alt="comic-book"
                        />
                      </div>
                      <div className="favorite-comic-description">
                        <h2>{comic.title}</h2>
                        <p>{comic.description}</p>
                      </div>
                    </>
                  );
                })}
              </section>
            ) : (
              <p>Whoops, you haven't picked any comic yet!</p>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Favorites;
