import React from 'react';
import "./Side.scss";
import {Link} from "react-router-dom";

const Side = () => {

  const nav = [
    {link : "/book", icon: "apps-sharp" ,name: "Book"},
    {link : "/film", icon: "accessibility-outline" ,name: "Add Film"},
    {link : "/nav3", icon: "archive-outline" ,name: "Nav 3"},
    {link : "/nav4", icon: "albums-outline" ,name: "Nav 4"},
    {link : "/nav5", icon: "alarm-outline" ,name: "Nav 5"},
  ]

  return (
    <div className="sidebar w-280px h-100vh border-main border d-flex flex-column text-light">
      <div className="sidebar_logo h-80px text-light border-main border-bottom text-uppercase d-flex align-items-center">
        <span className="text-orange">Chuối</span> Cinema
      </div>

      <div className="sidebar_user h-80px d-flex align-items-center flex-nowrap border-main border-bottom">
        <div className="sidebar_user-avatar d-flex bg-sub rounded-lg">
          <ion-icon name="person-outline text-size-22px">a</ion-icon>
        </div>
        <div className="sidebar_user-title d-flex flex-column justify-content-start align-items-start ">
          <span>Admin</span>
          <p className="m-0 font-weight-bold">Thịnh</p>
        </div>
        <button className="sidebar_user-btn d-flex ml-auto rounded-lg border-orange border bg-main">
          <ion-icon name="log-out-outline text-size-22px"></ion-icon>
        </button>
      </div>

      <div className="sidebar_nav">
        <nav>
          {nav.map( (nav, index) => (
              <li className="sidebar_nav-item" key={index}>
                <Link to={nav.link} className="d-inline-flex align-items-center text-decoration-none text-orange">
                  <ion-icon name={nav.icon} style={{marginRight: 15}}></ion-icon>{nav.name}
                </Link>
              </li>
          ))}
          
        </nav>
      </div>
    </div>
  )
}

export default Side
