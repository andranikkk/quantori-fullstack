import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./styles.css";
import LoginModal from "../login-modal";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const handleLoginClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="header">
      <div className="left-group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <div
          // className="tabs"
          className={`menu ${openMenu ? "open" : "tabs"}`}
        >
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link-start active" : "nav-link-start"
            }
            to="/home"
          >
            <button>Home</button>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/contact"
          >
            <button>Contact</button>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link-end active" : "nav-link-end"
            }
            to="/about"
          >
            <button>About</button>
          </NavLink>
        </div>
      </div>
      <div className="right-group">
        {window.outerWidth < 768 && (
          <button
            className="menu-button"
            onClick={() => setOpenMenu(!openMenu)}
          >
            ☰
          </button>
        )}
        <button className="login" onClick={handleLoginClick}>
          Login
        </button>
      </div>
      {openModal && <LoginModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Header;
