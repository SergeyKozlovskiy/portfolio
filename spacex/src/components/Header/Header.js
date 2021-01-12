import React from "react";
import ReactDOM from 'react-dom';
import {Link, NavLink} from "react-router-dom";
import './header.css';
import logo from '../../logo.svg';



const Header = (props) => {
  console.log(props);
    return(
        <header className="header">
          <Link to='/'>
              <img
                src={logo}
                alt="Logo Space X"
                className="logo"
            />
          </Link>
        <nav className="main-nav nav">
        <ul className="list">
            {props.rockets.map((item, i) => (
            <li key={i} className="item">
              <Link className="item-link" to="/rocket" 
              onClick={() =>{
                props.changeRocket(item)
              }}>{item}</Link>
            </li>
            ))}
        </ul>
        </nav>
        <nav className="secondary-nav">
          <ul className="list">
            <li className="item">
              <NavLink exact to="/" 
              activeClassName="active"
              className="item-link">Home</NavLink>
            </li>
            <li className="item">
              <NavLink exact to="/calendar" 
              activeClassName="active"
              className="item-link">Calendar</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
}

export default Header