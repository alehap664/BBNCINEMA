import React, { useState, useEffect } from "react";
import { FaWindowClose} from "react-icons/fa";

import axios from "axios";
import { API, throwErr } from "../../../../helper/main";

const Book = () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const [countries, setCountries] = useState([]);
  const [temp_countries, setTemp_countries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [temp_categories, setTemp_categories] = useState([]);
  const [select, setSelect] = useState({
    country: false,
    category: false,
  });
  const [director, setDirector] = useState([])
  const [cast, setCast] = useState([])
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const getData = (list) => {
          return async (path) => {
            const res = await axios.get(`${API}/${path}`);
            const data = res.data.map( ele => ( { ...ele, selected: false } ));
            list[0](data);
            list[1](data);
          };
        };
        await getData([setCountries, setTemp_countries])("countries");
        await getData([setCategories, setTemp_categories])("categories");
      } catch (error) {
        console.log(error);
      }
      
    })();

  }, []);

  const toggleName = (key) => {
    const toggle = {
      country: countries,
      category: categories,
      director: director,
      cast: cast,
      photos: photos,
    }
    return toggle[key]
  }
  const toggleTempName = (key) => {
    const toggle = {
      country: temp_countries,
      category: temp_categories
    }
    return toggle[key]
  }
  const toggleSetName = (key) => {
    const toggle = {
      country: setCountries,
      category: setCategories,
      director: setDirector,
      cast: setCast,
      photos: setPhotos
    }
    return toggle[key]
  }

  const dropDown = (key) => {
    const temp_select = { ...select };
    temp_select[key] = !temp_select[key];
    setSelect(temp_select);
  };

  const searchSelect = (e, key) => {
    e.target.size = e.target.value.length || 1;
    const searchKey = e.target.value.toLowerCase();
		const setter = key === "country" ? setTemp_countries : setTemp_categories;
    const name = toggleName(key);
    if (searchKey.length === 0) {
      setter(name);
      return;
    }

    let result = name.filter((ele) => {
      const str = ele[key].toLowerCase();
      const found = str.search(searchKey);
      if (found !== -1) {
        return true;
      }
      return false
    })

    result = !result[0] ? [{[key]: "No result found"}] : result
    setter(result);
  };
  
  const choose = name => id => {
    return name.map( ele => {
      if (ele._id === id) {
        ele.selected = !ele.selected
      }
      return ele
    })
  }

  const removeValue = (e, key) => {
    const value = e.target.parentElement.parentElement.textContent;
    const name = toggleName(key);
    const setName = toggleSetName(key);
    setName(name.filter( ele => ele[key] !== value));
  }

  const addValue = (e, key) => {
    const value = e.target.value.trim();
    const name = toggleName(key);
    const setName = toggleSetName(key);

    const keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      const data = {
        _id: name.length + 1,
        [key]: value,
      };
      name.push(data);
      setName([...name]);

      e.target.value = "";
    };
  }

  const onFocusInput = (key) => {
    $(`.${key}`).focus();
  }
  const onFocusDiv = key => {
    $(`div[data-input=${key}]`).classList.add("form__select--active");
  }
  const onBlurDiv = key => {
    $(`div[data-input=${key}]`).classList.remove("form__select--active");
  }

  const listSelectedNoDropdown = (key) => {
    const name = toggleName(key);
    return name.map( ele => (
      <li className="d-flex align-items-center" key={ele._id} id={"film__"+key}>
        <span className="d-flex align-items-center text-light">
          <FaWindowClose className="mr-1"
            onClick={(e) => removeValue(e, key)}
          />
          {ele[key]}
        </span>
      </li>
    )) 
  }

  const inputSelectNoDropdown = (key) => {
    const togglePlaceHolder = {
      director: "Director",
      cast: "Cast",
      photos: "Photos"
    }
    return <input
      type="text" autoComplete="off"
      className={`form-control bg-sub text-light rounded-lg ${key}`} size="1"
      placeholder={ toggleName(key).length === 0 ? togglePlaceHolder[key] : ""}
      onKeyPress={(e) => addValue(e, key)}
      onFocus={() => onFocusDiv(key)}
      onBlur={() => onBlurDiv(key)}
    />
  }

  const listSelected = (key) => {
    const name = toggleName(key);
    const setName = toggleSetName(key);
    return name
    .filter( ele => ele.selected)
    .map( (ele, index) => (
      <li className="d-flex align-items-center" key={index} id={"film__"+key}>
        <span className="d-flex align-items-center text-light">
          <FaWindowClose className="mr-1"
            onClick={() => setName(choose(name)(ele._id))}>
          </FaWindowClose>{ele[key]}
        </span>
      </li>
    ))
  }

  const listDropdown = (key) => {
    const name = toggleTempName(key);
    const setName = toggleSetName(key);
    return name.map( (ele, index) => (
      <li 
        className={ele.selected ? "selected" : ""}
        key={index} 
        onClick={() =>{
          setName(choose(toggleName(key))(ele._id))
        }}
      >{ele[key]}</li>
    ))
  }

  const inputSelect = (key) => {
    const togglePlaceHolder = {
      country: "Choose Country",
      category: "Choose Catelogy",
    }
    return <input
      type="text" name="" autoComplete="off"
      className={`form-control bg-sub text-light rounded-lg ${key}`} size="1"
      placeholder={ toggleName(key).filter( ele => ele.selected).length === 0 ? togglePlaceHolder[key] : ""}
      onChange={(e) => searchSelect(e, key)}
      onClick={() => dropDown(key)}
      onFocus={() => onFocusDiv(key)}
      onBlur={() => onBlurDiv(key)}
    />
  }

  const imageCover = (e) => {
    $("#imageCover").src = e.target.value;
  }

  const submit = (e) =>{
    
    e.preventDefault();
    const selectID = [
      "film__cover", "film__title", "film__description",
      "film__release", "film__running", "film__price"
    ]
    const selectAllID = [
      "film__cast", "film__director", "film__country", "film__category"
    ]

    selectID.map( ele => $(`#${ele}`))
    selectAllID.map( ele => $$(`#${ele}`));

    const formData = {};
    
    [
      ...selectID.map( ele => (
        {
          id: ele,
          data: $(`#${ele}`)
        }
      )),
      ...selectAllID.map( ele => (
        {
          id: ele,
          data: $$(`#${ele}`)
        }
      ))
    ]
    .forEach( ele => {
      const ID = ele.id;
      const data = ele.data;

      if (typeof data.value === "string") {
        if (data.value.length === 0) {
          alert(`${ID} is empty`);
          throw (`${ID} is empty`)
        };
        if (data.type === "number") return formData[ID] = +data.value;
        formData[ID] = data.value;
        return
      }

      if (data.length === 0) {
        alert(`${ID} is empty`);
        throw (`${ID} is empty`)
      }
      formData[ID] = [...data].map(ele => ele.textContent);
      
    });
   
    axios.post(API+"/films", formData)
    .then( res => {
      alert(res.data.success)
    }).catch( err => {
      alert(err.response.data.error);
      throw throwErr(err);
    })
    
  }

  return (
    <main className="container-fluid text-light">
      <header className="row">
        <div className="col-12">
          <div className="mb-30px h-80px d-flex align-items-center border-bottom border-main">
            <p className="m-0 text-size-22px">Thêm Phim</p>
          </div>
        </div>

        <div className="col-12">
          <form 
            className="border border-main" encType="multipart/form-data"
            onSubmit={submit} 
            onKeyPress={(e) => {
              const key = e.keyCode || e.which;
              if (key === 13) e.preventDefault();
            }}
          >
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <input 
                    type="text" placeholder="Image Cover"
                    className="form-control bg-sub text-light rounded-lg"
                    name="img" id="film__cover" onChange={imageCover} 
                  />
                </div>
              </div>

              <div className="form-cover">
                <div className="form__img">
                  <img
                    className="w-100 h-100 rounded-lg bg-sub" id="imageCover"
                    srcSet=""
                  />
                  <label htmlFor="">Image Cover(380x420)</label>
                </div>
              </div>
              
              <div className="form-content">
                <div className="row">
                  {/* Title */}
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-sub text-light rounded-lg"
                        name="title"
                        id="film__title"
                        placeholder="Title"
                      />
                    </div>
                  </div>
                  
                  {/* Cast */}
                  <div className="col-12 col-md-6">
                    <div className="form-group form__select">
                      <div 
                        className="form__select--selected bg-sub text-light rounded-lg d-flex h-100"
                        data-input="cast" onClick={() => onFocusInput("cast")}
                      >
                        <ul className="d-flex flex-wrap align-items-center h-100 w-100">
                          { listSelectedNoDropdown("cast") }
                          { inputSelectNoDropdown("cast") }
                        </ul>
                      </div>
                      
                    </div>
                  </div>

                  {/* Director */}
                  <div className="col-12 col-md-6">
                    <div className="form-group form__select">
                      <div 
                        className="form__select--selected bg-sub text-light rounded-lg d-flex h-100"
                        data-input="director" onClick={() => onFocusInput("director")}
                      >
                        <ul className="d-flex flex-wrap align-items-center h-100 w-100">
                          { listSelectedNoDropdown("director") }
                          { inputSelectNoDropdown("director") }
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Realease */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control bg-sub text-light rounded-lg"
                        name="release"
                        id="film__release"
                        placeholder="Release year"
                      />
                    </div>
                  </div>

                  {/* Running */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control bg-sub text-light rounded-lg"
                        name="running"
                        id="film__running"
                        placeholder="Running time"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-12 col-md-12 col-lg-4">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control bg-sub text-light rounded-lg"
                        name="price"
                        id="film__price"
                        placeholder="Giá"
                      />
                    </div>
                  </div>


                  {/* Country */}
                  <div className="col-12 col-md-6">
                    <div className="form-group form__select">
                      <div 
                        className="form__select--selected bg-sub text-light rounded-lg d-flex h-100"
                        data-input="country" onClick={() => onFocusInput("country")}
                      >
                        <ul className="d-flex flex-wrap align-items-center h-100 w-100">
                          { listSelected("country") }
                          { inputSelect("country") }
                        </ul>
                      </div>
                      <div className={"form__select--dropdown " + (select['country'] ? 'active' : '')}>
                        <ul className="m-0 p-0 list-unstyled h-100">
                          {listDropdown("country")}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-12 col-md-6">
                    <div className="form-group form__select">
                      <div 
                        className="form__select--selected bg-sub text-light rounded-lg d-flex h-100"
                        data-input="category" onClick={() => onFocusInput("category")}
                      >
                        <ul className="d-flex flex-wrap align-items-center h-100 w-100">
                          { listSelected("category") }
                          { inputSelect("category") }
                        </ul>
                      </div>
                      <div className={"form__select--dropdown " + (select['category'] ? 'active' : '')}>
                        <ul className="m-0 p-0 list-unstyled h-100">
                          {listDropdown("category")}
                        </ul>
                      </div>
                    </div>
                  </div>

                   {/* Description */}
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control bg-sub text-light rounded-lg"
                        name="description"
                        id="film__description"
                        rows="5"
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>

                </div>
              </div>

             

              {/* Photos
              <div className="col-12">
                <div className="form-group form__select">
                  <div 
                    className="form__select--selected bg-sub text-light rounded-lg d-flex h-100"
                    data-input="photos" onClick={() => onFocusInput("photos")}
                  >
                    <ul className="d-flex flex-wrap align-items-center h-100 w-100">
                      { listSelectedNoDropdown("photos") }
                      { inputSelectNoDropdown("photos") }
                    </ul>
                  </div>
                </div>
              </div> */}

              {/* Video
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control bg-sub text-light rounded-lg"
                    name="video" id="film__video" placeholder="Video"
                  />
                </div>
              </div> */}

              {/* Trailer
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control bg-sub text-light rounded-lg"
                    id="film__trailer"
                    placeholder="Trailer"
                  />
                </div>
              </div> */}

              {/* Background
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control bg-sub text-light rounded-lg"
                    id="film__bg"
                    placeholder="bg"
                  />
                </div>
              </div> */}

              {/* Publish */}
              <div className="col-12">
                <button
                  type="submit"
                  className="btn text-light border-orange border border-2"
                >
                  Publish
                </button>
              </div>
            </div>
          </form>
        </div>
      </header>
    </main>
  );
};

export default Book;
// Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis nulla ducimus dolore minus quibusdam temporibus at soluta autem libero, vitae quidem officiis ex possimus repellendus itaque ullam sunt odit nam!
// Nisi a molestias ad. Tempora, fugit numquam cum iste sunt adipisci hic voluptatem ipsam, laudantium totam, non nihil rerum nulla minus. Iure rem temporibus omnis maxime inventore corporis dignissimos recusandae.
