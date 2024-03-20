import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import { logout } from '../../action/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Sidebar({isHidden}) {
  const [click, setClick] = useState("dashboard");
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(value) {
    setClick(value);
  }

  async function handelLogout(e){
    const action = await logout();
    dispatch(action);
    setIsLogout(true);
  }

  useEffect(()=>{
    if(isLogout === true){
      navigate("/");
    }
  }, [isLogout])

  return ( 
    <section id="sidebar" className={isHidden ? 'hidden' : ''}>
      <a href="/restaurant" className="brand">
        <img src={logo} alt="Logo" />
        <span className="text">Booking Restaurant</span>
      </a>
      <a href="/restaurant/account" className="account">
        <img src={localStorage.getItem("avatar")} alt="User" />
        <span className="text">{localStorage.getItem("username")}</span>
      </a>
      <ul className="side-menu top">
        <li className={click === "dashboard" ? "active" : ""}>
          <NavLink to="/restaurant" onClick={() => handleClick("dashboard")}>
            <i className="fab fa-windows"></i>
            <span className="text">Dashboard</span>
          </NavLink>
        </li>
        <li className={click === "manage-order" ? "active" : ""}>
          <NavLink to="/restaurant/manage-order" onClick={() => handleClick("manage-order")}>
            <i className="fa-regular fa-calendar-days"></i>
            <span className="text">Manage Order</span>
          </NavLink>
        </li>
        <li className={click === "dish" ? "active" : ""}>
          <NavLink to="/restaurant/dish" onClick={() => handleClick("dish")}>
            <i className="nav-icon fas fa-hamburger"></i>
            <span className="text">The Dishes</span>
          </NavLink>
        </li>
        <li className={click === "table" ? "active" : ""}>
          <NavLink to="/restaurant/table" onClick={() => handleClick("table")}>
            <i className="nav-icon fas fa-chair"></i>
            <span className="text">The Tables</span>
          </NavLink>
        </li>
        <li className={click === "review" ? "active" : ""}>
          <NavLink to="/restaurant/review" onClick={() => handleClick("review")}>
            <i className="nav-icon fas fa-comments"></i>
            <span className="text">Reviews</span>
          </NavLink>
        </li>
        <li className={click === "history" ? "active" : ""}>
          <NavLink to="/restaurant/history-order" onClick={() => handleClick("history")}>
            <i className="fa-solid fa-clock-rotate-left"></i>
            <span className="text">History Order</span>
          </NavLink>
        </li>
        <li className={click === "message" ? "active" : ""}>
          <NavLink to="/restaurant/chat-message" onClick={() => handleClick("message")}>
            <i className="nav-icon far fa-comment-dots"></i>
            <span className="text">Chat Messages</span>
          </NavLink>
        </li>
      </ul>
      <a className="menu-other">Others</a>
      <ul className="side-menu">
        <li className={click === "contact" ? "active" : ""}>
          <NavLink to="/restaurant/contact-us" onClick={() => handleClick("contact")}>
            <i className="fa-solid fa-headset"></i>
            <span className="text">Contact Us</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="logout">
            <i className="fas fa-sign-out"></i>
            <span className="text" onClick={handelLogout}>Logout</span>
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;