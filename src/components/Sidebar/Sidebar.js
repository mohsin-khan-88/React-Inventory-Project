import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCubes,
  faChartBar,
  faChartPie,
  faHandHoldingUsd,
  faList,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <>
      <div className="col col-md-3 border-end sidebar">
        <div className="logoCon">
          <FontAwesomeIcon className="logoIcon" icon={faCubes} />
          <h3 className="text-uppercase text-center logo">Inventory</h3>
        </div>
        <ul className="nav flex-column nav-pills">
          <li className="nav-item">
            <NavLink
              exact='true'
              className="nav-link text-uppercase mt-1 mb-1"
              to="/"
            >
              <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-uppercase mt-1 mb-1" to="/stock">
              <FontAwesomeIcon icon={faCubes} /> Stock
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-uppercase mt-1 mb-1" to="/sales">
              <FontAwesomeIcon icon={faChartBar} /> Sales
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-uppercase mt-1 mb-1"
              to="/expense"
            >
              <FontAwesomeIcon icon={faHandHoldingUsd} /> Expense
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-uppercase mt-1 mb-1"
              to="/reports"
            >
              <FontAwesomeIcon icon={faChartPie} /> Reports
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link text-uppercase mt-1 mb-1"
              to="/categories"
            >
              <FontAwesomeIcon icon={faList} /> Categories
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
