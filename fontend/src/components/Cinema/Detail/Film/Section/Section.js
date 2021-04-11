import {useState} from 'react';
import { Card} from '../../../UI/UI';
import { Tab } from "../../../../../helper/main";

// Sub Component
import Comments from "./Comments";
import Reviews from './Reviews';
import Photos from './Photos';

const Section = ({film}) => {
  const {changeTab, dropdownContent, getLabel} = Tab;
  const [label, setLabel] = useState("NEW RELEASES")

  const tabData = [
    { id: "tab-comments", label: "COMMENTS" },
    { id: "tab-reviews", label: "REVIEWS" },
    { id: "tab-photos", label: "PHOTOS" }
  ]

  return (
    <section className="section">
      <div className="content__head">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="content__title">Discovery</h2>
              <ul className="content__tabs">
                {tabData.map( (ele, index) => (
                  <li key={ele.id} id={ele.id} className={`tab ${index === 0 ? "tab--active" : ""}`}>
                    <span 
                      onClick={() => {
                        changeTab(ele.id, ele.label);
                        setLabel(getLabel());
                      }} >{ele.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="content__mobile">
                <div className="content__mobile--btn" onClick={dropdownContent}>
                  <input type="button" value={label} />
                  <span></span>
                </div>
                <div className="content__mobile--dropdown">
                  <ul className="content__mobile--nav">
                    {tabData.map( (ele, index) => (
                      <li key={ele.id} id={ele.id} className={`tab ${index === 0 ? "tab--active" : ""}`}>
                        <span 
                          onClick={() => {
                            changeTab(ele.id, ele.label);
                            setLabel(getLabel());
                          }} >{ele.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="tab--content">
              <Comments />
              <Reviews />
              <Photos photos={film.film__photos} />
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="row">
              {film.film__ref.map( film => (
                <div className="col-6" key={film.id}>
                  <Card 
                    to={"/cinema/detail/"+film.id} 
                    title={film.film__title} 
                    categories={film.film__categories} 
                    image={film.film__cover} rate={film.film__rate}></Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Section
