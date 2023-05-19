import React, {useEffect, useState} from "react";
import Tmdb from "./tmdb.js";
import MovieRow from "./src/helpers/componets/MovieRow";
import './App.css'
import FreaturedMovie from "./src/helpers/componets/FreaturedMovie";
import Header from "./src/helpers/componets/Header";

const App = () => {

  const[movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] =useState(false);

  useEffect(()=>{
    const LoadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list)

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    LoadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return  () => {
      window.removeEventListener('scroll', scrollListener)
    }

  }, [])

  return (
    <div className="page">

      <Header black={blackHeader}></Header>

      {featuredData &&
        <FreaturedMovie item={featuredData}></FreaturedMovie>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))}
      </section>
          {movieList.length <= 0 &&
      <div className="loading">
        <img  src="https://blog.ecadauma.com.br/wp-content/uploads/2020/04/netflix-loading.gif" alt="Carregando"></img>
      </div>
      }
    </div>
  );
}

export default App;