import React from 'react';
import { Link } from 'react-router-dom';

import "./header.css";


const Header = (props) =>
    <header className="main-header">
        <div className="header-logo"><Link to='/'>CORAS</Link></div>
        <nav className="main-menu-container">
            <ul className="main-menu">
                <li className="main-menu main-menu__item"><Link to={"/introduction"}>Introduction</Link></li>
                <li className="main-menu main-menu__item"><Link to={"#"}>About</Link></li>
                <li className="main-menu main-menu__item"><Link to={"#"}>Try it</Link></li>
            </ul>
        </nav>
    </header>;

export default Header;