import { useEffect, useState } from 'react';
import { getData, throwErr, API } from '../../../helper/main';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { addFilms } from '../../../actions/film';

import Content from './Content/Content';
import Header from "./Header/Header";
import Section from './Section/Section';
import Loading from '../../Loading/Loading';
import NotFound from '../../Notfound/Notfound';

const Home = () => {
  const [filmsSlide, setFilmsSlide] = useState([]);
  
  const [isErr, setIsErr] = useState(false);

  // Redux
  const filmsStored = useSelector(state => state.filmsStored);
  const disPatch = useDispatch();

  useEffect(() => {
    // Kiểm tra trong store đã get film đó chưa bằng id
    if (filmsStored.length !== 0) {
      const tripleData = [...filmsStored.slice(0,5), ...filmsStored.slice(0,5), ...filmsStored.slice(0,5)];
      setFilmsSlide(tripleData);
      return;
    }
    // Get film
    getData(`${API}/films`, (err, res) => {
      if (err) {
        setIsErr(true)
        throwErr(err)
      };
      const newFilms = res.data;
      disPatch(addFilms(newFilms));
    });

    getData(`${API}/films?limit=5`, (err, res) => {
      if (err) {
        setIsErr(true)
        throwErr(err)
      };
      const newFilms = res.data;
      const tripleData = [...newFilms, ...newFilms, ...newFilms];
      setFilmsSlide(tripleData);
    });
     
  }, [filmsStored, disPatch])

  return (
    isErr 
      ? <NotFound /> 
      : 
        <article className="home">
          {!filmsSlide[0] ? <Loading /> : <Header films={filmsSlide} /> }
          <Content /> 
          {!filmsSlide[0] ? <Loading /> : <Section films={filmsSlide} /> }
        </article>
  )
}

export default Home
