import { useState, useEffect } from "react";

import { useSelector } from 'react-redux';

import Head from "./Head";
import Container from "./Container";
import { getData, API, throwErr } from "../../../../helper/main";
import Loading from "../../../Loading/Loading";

const Content = () => {
  const [filmsNew, setFilmsNew] = useState([]);
  const [filmActions, setFilmsActions] = useState([]);
  const [filmAnimations, setFilmsAnimations] = useState([]);
  const [filmFantasies, setFilmsFantasies] = useState([]);

  const filmsStored = useSelector(state => state.filmsStored);

  useEffect(() => {
    // Kiểm tra trong store đã get film đó chưa bằng id
    if (filmsStored.length !== 0) {
      const filmsActions = filmsStored.filter(ele => ele.film__categories.includes("Action"));
      filmsActions.length = 18
      const filmsAnimations = filmsStored.filter(ele => ele.film__categories.includes("Animation"))
      filmsAnimations.length = 18;
      const filmsFantasies = filmsStored.filter(ele => ele.film__categories.includes("Fantasy"))
      filmsFantasies.length = 18;

      setFilmsNew(filmsStored.slice(-18))
      setFilmsActions(filmsActions);
      setFilmsAnimations(filmsAnimations);
      setFilmsFantasies(filmsFantasies);

      return;
    }
    getData(`${API}/films?limit=18`, (err, res) => {
      if (err) throwErr(err);
      const newFilms = res.data;
      setFilmsNew(newFilms);
    });
    getData(`${API}/films?limit=18&categories=action`, (err, res) => {
      if (err) throwErr(err);
      const newFilms = res.data;
      setFilmsActions(newFilms);
    });
    getData(`${API}/films?limit=18&categories=animation`, (err, res) => {
      if (err) throwErr(err);
      const newFilms = res.data;
      setFilmsAnimations(newFilms);
    });
    getData(`${API}/films?limit=18&categories=fantasy`, (err, res) => {
      if (err) throwErr(err);
      const newFilms = res.data;
      setFilmsFantasies(newFilms);
    });
  }, [filmsStored])

  return filmsNew.length === 0 ? <Loading /> : (
    <section className="content">
      <Head />
      <Container 
        filsNew={filmsNew} 
        filmActions={filmActions} 
        filmAnimations={filmAnimations} 
        filmFantasies={filmFantasies} 
      />
    </section>
  )
}

export default Content
