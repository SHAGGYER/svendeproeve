import React, { useContext, useState } from 'react';
import './Navbar.css';
import AppContext from '../../Contexts/AppContext';
import Logo from '../../Images/logo.png';
import { Link } from 'react-router-dom';

export default function () {
  const { mobileMatches, setToken } = useContext(AppContext);
  const [isNavbarActive, setNavbarActive] = useState(false);

  return (
    <section className={'navbar '}>
      <div className="navbar__container">
        <div className="flex items-center">
          <img className="navbar__logo mr-2" src={Logo} alt="logo" />
          <h3>Foreningen for Dyrevelfærd</h3>
        </div>

        {mobileMatches && (
          <div
            className="navbar__toggler"
            onClick={() => setNavbarActive(!isNavbarActive)}
          >
            <i className="fas fa-bars"></i>
          </div>
        )}

        <ul
          className={
            'navbar__nav ' + (isNavbarActive ? 'navbar__nav--active' : '')
          }
        >
          <li className="navbar__nav-item">
            <Link to="/" className="text-gray-600 hover:text-black">
              Hjem
            </Link>
          </li>
          <li className="navbar__nav-item">
            <a href="#about" className="text-gray-600 hover:text-black">
              Om Os
            </a>
          </li>
          <li className="navbar__nav-item">
            <a href="#volunteer" className="text-gray-600 hover:text-black">
              Bliv Frivillig
            </a>
          </li>
          <li className="navbar__nav-item">
            <a href="#help" className="text-gray-600 hover:text-black">
              Dyr I Nød?
            </a>
          </li>
          <li className="navbar__nav-item">
            <a href="#adopt" className="text-gray-600 hover:text-black">
              Adoptér Et Dyr
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
