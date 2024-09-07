import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero2stan from "../pictures/Hero2stan.png";
import ArrowLeft from "../pictures/ArrowLeft.png";
import ArrowRight from "../pictures/ArrowRight.png";
import axios from "axios";
import Cookies from "js-cookies";

const Characters = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pagenum, setPagenum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [cookieArr, setCookieArr] = useState([]);
  const [characSearch, setCharacSearch] = useState("");
  let limit = 20;
  let copyArr = [];
  let count = 0;

  useEffect(() => {
    if (Cookies.getItem("favorite-characs")) {
      setCookieArr(Cookies.getItem("favorite-characs").split(","));
    }
  }, []);

  useEffect(() => {
    const getCharacsFunc = async () => {
      try {
        const data = await axios.get(
          `http://localhost:3000/characters?name=${characSearch}&limit=${limit}&page=${pagenum}`
        );
        count = data.data.count;

        setData(data.data);
        if (count % limit === 0) {
          setLastPage(count / limit);
        } else {
          setLastPage(Math.trunc(count / limit + 1));
        }
        console.log(lastPage);
        setLoading(false);
      } catch (error) {
        console.log("message d'erreur page characters ==>" + error.response);
      }
    };
    getCharacsFunc();
  }, [pagenum] && [characSearch]);

  useEffect(() => {
    if (cookieArr.length > 0) {
      Cookies.setItem("favorite-characs", [cookieArr], { expires: 30 });
    }
  }, [cookieArr]);

  const characters = data.results;
  console.log(characters);

  const CookieArrSet = (id) => {
    if (!cookieArr.includes(id)) {
      copyArr = [...cookieArr];
      copyArr.push(id);
      setCookieArr(copyArr);
    }
  };

  return (
    <>
      <Header />
      {loading === false ? (
        <main>
          <section className="Stan-quote">
            <div className="pic-quote">
              <img src={Hero2stan} alt="Stan Lee picture" />
            </div>
            <div className="quotation">
              <p>
                "That personn who helps others, simply because it should or must
                be done, and because it's the right thing to do, is indeed
                without a doubt, a real superhero."
                <br />
                <span>Stan Lee</span>
              </p>
            </div>
          </section>
          <section id="characters-list">
            <section id="character-search">
              <input
                type="text"
                id="searchCharacter"
                name="searchCharacter"
                placeholder="What are you looking for?"
                onChange={(event) => {
                  setCharacSearch(event.target.value);
                }}
              />
            </section>
            {characters.map((item, index) => {
              let imgpath = `${item.thumbnail.path}/standard_xlarge.jpg`;
              return Number(index) % 2 === 0 ? (
                <section className="leftsec" key={item._id}>
                  <p>Section gauche</p>
                  <div className="character-pic">
                    <img src={imgpath} />
                    <div onClick={() => CookieArrSet(item._id)}>like</div>
                  </div>
                  <div className="character-info">
                    {item.name && <h2>{item.name}</h2>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <div className="character-comics-link">
                    <p>
                      Enjoy <span>{item.name}</span> comics? Maybe you will find
                      a new (or old) one here!
                    </p>
                    <Link to={"/comics/" + item._id} key={item.id}>
                      <button>{item.name} comics</button>
                    </Link>
                  </div>
                </section>
              ) : (
                <section className="leftsec" key={item._id}>
                  <p>Section droite</p>
                  <div className="character-pic">
                    <img src={imgpath} />
                  </div>
                  <div className="character-info">
                    {item.name && <h2>{item.name}</h2>}
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <div className="character-comics-link">
                    <p>
                      Enjoy <span>{item.name}</span> comics? Maybe you will find
                      a new (or old) one here!
                    </p>
                    <Link
                      to={"/comics/" + item._id}
                      state={{ name: item.name, comicsArr: item.comics }}
                      key={item.id}
                    >
                      <button>{item.name} comics</button>
                    </Link>
                  </div>
                </section>
              );
            })}
          </section>
          <div className="arrows">
            {pagenum === 1 ? (
              <img src={ArrowRight} onClick={() => setPagenum(pagenum + 1)} />
            ) : pagenum === lastPage ? (
              <img src={ArrowLeft} onClick={() => setPagenum(pagenum - 1)} />
            ) : (
              <div className="botharrows">
                <img src={ArrowLeft} onClick={() => setPagenum(pagenum - 1)} />
                <img src={ArrowRight} onClick={() => setPagenum(pagenum + 1)} />
              </div>
            )}
          </div>
        </main>
      ) : (
        <p>En cours de chargement...</p>
      )}

      <Footer />
    </>
  );
};

export default Characters;
