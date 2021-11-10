import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faTachometerAlt, faCubes, faChartBar, faChartPie, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    return (
        <>
                <div className='col col-md-3 border-end sidebar'>
                <div>
                    <h3 className='text-uppercase text-center mt-3 mb-3'> <FontAwesomeIcon icon={faDolly} /> Inventory</h3>
                </div>
                    {/* <Router> */}
                    <ul class="nav flex-column nav-pills">
                        <li class="nav-item">
                        <NavLink exact={true} activeClassName='active' className='nav-link text-uppercase mt-1 mb-1' to="/"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</NavLink>
                        </li>
                        <li class="nav-item">
                        <NavLink activeClassName='active' className='nav-link text-uppercase mt-1 mb-1' to="/stock"><FontAwesomeIcon icon={faCubes} /> Stock</NavLink>
                        </li>
                        <li class="nav-item">
                        <NavLink activeClassName='active' className='nav-link text-uppercase mt-1 mb-1' to="/sales"><FontAwesomeIcon icon={faChartBar} /> Sales</NavLink>
                        </li>
                        <li class="nav-item">
                        <NavLink activeClassName='active' className='nav-link text-uppercase mt-1 mb-1' to="/expense"><FontAwesomeIcon icon={faHandHoldingUsd} /> Expense</NavLink>
                        </li>
                        <li class="nav-item">
                        <NavLink activeClassName='active' className='nav-link text-uppercase mt-1 mb-1' to="/reports"><FontAwesomeIcon icon={faChartPie} /> Reports</NavLink>
                        </li>
                    </ul>
                    {/* </Router> */}
                </div>
        </>
    );
}

export default Sidebar;
