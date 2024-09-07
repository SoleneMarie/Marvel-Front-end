import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero2stan from "../pictures/Hero2stan.png";

const ComicsCharacters = ({}) => {
  const idToGet = useParams();
  const idChar = idToGet.characterId;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const [comicsData, setComicsData] = useState([]);

  const getComicsFunc = async (ids) => {
    try {
      const comics = [];
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const comic = await axios.get(`http://localhost:3000/comic/${id}`);
        comics.push(comic.data);
      }

      setComicsData(comics);
    } catch (error) {
      console.log("erreur de la fonction imbriquée", error);
    }
  };
  /* Mon UseEffect pour récupérer les données des characs */
  useEffect(() => {
    const getCharac = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/character/${idChar}`
        );
        setData(response.data);
        const comicsIds = response.data.comics;
        getComicsFunc(comicsIds);
      } catch (error) {
        console.log(error);
      }
    };
    setLoading(false);
    getCharac();
  }, []);

  return (
    <>
      {console.log(comicsData)}
      <Header />
      {loading === false && data ? (
        <main>
          <section className="Stan-quote">
            <div className="pic-quote">
              <img src={Hero2stan} alt="Stan Lee picture" />
            </div>
            <div className="quotation">
              <p>
                "When I was a kid, my favorite superhero was Robin Hood."
                <br />
                <span>Stan Lee</span>
              </p>
            </div>
          </section>
          {comicsData.length > 0 ? (
            <>
              <section id="introComics">
                <section className="charac-smallpic">
                  <Link to={`/character/${idChar}`}>
                    <img
                      src={`${data.thumbnail.path}/portrait_medium.${data.thumbnail.extension}`}
                    />
                  </Link>
                </section>
                <h2>{data.name} comics</h2>
                <p>
                  {data.description} Scroll and find all {data.name} comics.
                  Hope you will find happiness!
                </p>
              </section>
              <section id="allComics">
                {comicsData.map((comic) => {
                  return (
                    <section key={comic._id}>
                      <section className="oneComic-pic">
                        <Link to={`/comic/${comic._id}`}>
                          <img
                            src={`${comic.thumbnail.path}/portrait_medium.${comic.thumbnail.extension}`}
                            alt="comicbook"
                          />
                        </Link>
                      </section>
                      <section className="oneComic">
                        <div className="comic-presentation">
                          <h3>{comic.title}</h3>
                          {comic.description ? (
                            <p className="comic-desc">{comic.description}</p>
                          ) : (
                            <p className="comic-nodesc">
                              No summary available, but it must be amazing!
                            </p>
                          )}
                        </div>
                      </section>
                    </section>
                  );
                })}
              </section>
            </>
          ) : (
            <>
              <h2>{data.name} comics</h2>
              <p>No comics available yet, sorry!</p>
            </>
          )}
        </main>
      ) : (
        <main>
          <p>Chargement en cours, veuillez patienter...</p>
        </main>
      )}
      <Footer />
    </>
  );
};

export default ComicsCharacters;
