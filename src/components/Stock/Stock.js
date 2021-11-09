import React from 'react';
import './Stock.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Stock() {
    return (
        <>
        <div className='stock'>
            <h1 className="text- text-uppercase m-3">Stock</h1>
        </div>
        <div className='stock'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button type="button" className="btn btn-outline-dark">Add Stock</button>
                    </div>
                    <div className="col">
                    <form className="form-inline d-flex" to='/'>
                        <input className="form-control mr-sm-2 border-dark" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark my-2 my-sm-0 m-1" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="container stock">
            <div className="row">
                <div className="col">
                    <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td><img src='https://via.placeholder.com/50' alt='' /></td>
                            <td>Old Navy</td>
                            <td>$1200</td>
                            <td>500</td>
                            <td>Bags</td>
                            <td>
                            <Link to='/edit?id=1'><FontAwesomeIcon className='m-1' icon={faEdit} /></Link>
                            <Link to='/delete?id=1'><FontAwesomeIcon className='m-1' icon={faTrashAlt} /></Link>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td><img src='https://via.placeholder.com/50' alt='' /></td>
                            <td>Old Navy</td>
                            <td>$1200</td>
                            <td>500</td>
                            <td>Bags</td>
                            <td>
                            <Link to='/edit?id=2'><FontAwesomeIcon className='m-1' icon={faEdit} /></Link>
                            <Link to='/delete?id=2'><FontAwesomeIcon className='m-1' icon={faTrashAlt} /></Link>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td><img src='https://via.placeholder.com/50' alt='' /></td>
                            <td>Old Navy</td>
                            <td>$1200</td>
                            <td>500</td>
                            <td>Bags</td>
                            <td>
                            <Link to='/edit?id=3'><FontAwesomeIcon className='m-1' icon={faEdit} /></Link>
                            <Link to='/delete?id=3'><FontAwesomeIcon className='m-1' icon={faTrashAlt} /></Link>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Stock;
