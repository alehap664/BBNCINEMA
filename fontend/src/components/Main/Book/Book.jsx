import React, { useState, useEffect } from "react";
import "./Book.scss";
import axios from "axios";
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

  useEffect(() => {
    (async () => {
      try {
        const getData = (list) => {
          return async (path) => {
            const res = await axios.get("https://ndthinh-react-cinema.herokuapp.com/films/" + path);
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
      category: categories
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
      category: setCategories
    }
    return toggle[key]
  }
  const toggleSetTempName = (key) => {
    const toggle = {
      country: setTemp_countries,
      category: setTemp_categories
    }
    return toggle[key]
  }

  const dropDown = (key) => {
    const temp_select = { ...select };
    temp_select[key] = !temp_select[key];
    setSelect(temp_select);
  };

  const searchSelect = (e) => {
    e.target.size = e.target.value.length || 1;
    const id = e.target.id.slice(0, e.target.id.length - 3) + "y";
    const key = e.target.value.toLowerCase();
		const setter = id === "country" ? setTemp_countries : setTemp_categories;
    const name = toggleName(id);
    if (key.length === 0) {
      setter(name);
      return;
    }

    let result = name.filter((ele) => {
      const str = ele[id].toLowerCase();
      const found = str.search(key);
      if (found !== -1) {
        return true;
      }
      return false
    })

    result = result == 0 ? [{[id]: "No result found"}] : result
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

  const listSelected = (key) => {
    const name = toggleName(key);
    const setName = toggleSetName(key);
    return name
    .filter( ele => ele.selected)
    .map( (ele, index) => (
      <li className="d-flex align-items-center" key={index} id={"form__"+key}>
        <span className="d-flex align-items-center text-light">
          <ion-icon
            name="close-sharp"
            onClick={() => setName(choose(name)(ele._id))}>
          </ion-icon>{ele[key]}
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
        onClick={() => setName(choose(toggleName(key))(ele._id))}>{ele[key]}</li>
    ))
  }

  const inputSelect = (key) => {
    const togglePlaceHolder = {
      country: "Choose Country",
      category: "Choose Catelogy",
    }
    return <input
      type="text" name="" autoComplete="off"
      className="form-control bg-sub text-light rounded-lg" size="1"
      placeholder={ toggleName(key).filter( ele => ele.selected).length === 0 ? togglePlaceHolder[key] : ""}
      onChange={searchSelect}
      onClick={() => dropDown(key)}
    />
  }

  const upload = (e, label, key) => {
    const a = document.getElementById(label);
    let record = e.target.files.length;
    console.log(e);
    const file = {
      image: record === 0 ? "Upload File" : record + " tệp được chọn",
      video: record === 0 ? "Upload Video" : record + " tệp được chọn"
    }
    a.innerHTML = file[key];
  }

  const imageCover = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      $("#imageCover").srcset = reader.result;
      $("#imageCover").alt = e.target.files[0].name;
    }
  }

  const submit = (e) =>{
    
    e.preventDefault();
    const selectID = [
      "form__img", "form__title", "form__description", "form__release", "form__running",
      "form__price", "form__photos", "form__video1", "form__video2"
    ]
    const selectAllID = ["form__country", "form__category",]

    selectID.map( ele => $(`#${ele}`))
    selectAllID.map( ele => $$(`#${ele}`))
    
    const listField = [
      ...selectID.map( ele => $(`#${ele}`)),
      ...selectAllID.map( ele => $$(`#${ele}`))
    ]
    .map( ele => {
      // console.log(ele.type);
      if (ele.type !== "file" && ele.type) {
        return {[ele.id]: ele.value}
      }
      if (ele.type === "file") {
        return {[ele.id]: ele.files}
      }
      console.log(123);
      if (typeof ele.length === "number") {
        
        return {[ele.id]: [...ele].map(ele => ele.textContent)}
      }
    })
    
    console.log(listField);

    
    // console.log(e);
  }

  return (
    <main className="container-fluid text-light">
      <header className="row">
        <div className="col-12">
          <div className="mb-30px h-80px d-flex align-items-center border-bottom border-main">
            <p className="m-0 text-size-22px">Nav 1</p>
          </div>
        </div>

        <div className="col-12">
          <form className="border border-main" onSubmit={submit}>
            <div className="row">
              <div className="col-12 form-cover">
                <div className="form__img d-flex justify-content-center align-items-center bg-sub">
                  <label htmlFor="form__img" className="text-muted">
                    Image Cover (280x420)
                  </label>
                  <input type="file" name="img" id="form__img" onChange={imageCover} />
                  <img
                    className="w-100 h-100 rounded-lg" id="imageCover"
                    alt=""
                    srcSet="https://lh3.google.com/u/0/d/1XmIxJg37ltJylfDbeDWBwWQ7Lv7StvgR=w0-nu-iv1"
                  />
                </div>
              </div>
              <div className="col-12 form-content">
                <div className="row">
                  {/* Title */}
                  <div className="col-12">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control bg-sub text-light rounded-lg"
                        name="title"
                        id="form__title"
                        placeholder="Title"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <div className="form-group">
                      <textarea
                        className="form-control bg-sub text-light rounded-lg"
                        name="description"
                        id="form__description"
                        rows="5"
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>

                  {/* Realease */}
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control bg-sub text-light rounded-lg"
                        name="release"
                        id="form__release"
                        placeholder="Release year"
                      />
                    </div>
                  </div>

                  {/* Running */}
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control bg-sub text-light rounded-lg"
                        name="running"
                        id="form__running"
                        placeholder="Running time"
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-12 col-md-6 col-lg-6">
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control bg-sub text-light rounded-lg"
                        name="price"
                        id="form__price"
                        placeholder="Giá"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div className="col-12 col-md-6">
                    <div className="form-group form__select">
                      <div className="form__select--selected bg-sub text-light rounded-lg d-flex h-100">
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
                      <div className="form__select--selected bg-sub text-light rounded-lg d-flex h-100">
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

                  {/* Photos */}
                  <div className="col-12">
                    <div className="form-group form__photos">
                      <label
                        htmlFor="form__photos" id="label__photos"
                        className="bg-sub text-light rounded-lg"
                      >
                        Upload Photos<ion-icon name="images-outline"></ion-icon>
                      </label>
                      <input
                        type="file"
                        multiple accept=".png, .jpg, .jpeg"
                        className="form-control bg-sub text-light rounded-lg"
                        name="photos"
                        id="form__photos"
                        onChange={(e) => upload(e, "label__photos", "image")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Video */}
              <div className="col-12">
                <div className="form-group form__video">
                  <label
                    htmlFor="form__video" id="label__video"
                    className="bg-sub text-light rounded-lg"
                  >
                    Upload Video<ion-icon name="videocam-outline"></ion-icon>
                  </label>
                  <input
                    type="file"
                    className="form-control bg-sub text-light rounded-lg"
                    name="video"
                    id="form__video1"
                    onChange={(e) => upload(e, "label__video", "video")}
                  />
                </div>
              </div>

              {/* Video link */}
              <div className="col-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control bg-sub text-light rounded-lg"
                    id="form__video2"
                    placeholder="Or link"
                  />
                </div>
              </div>

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
