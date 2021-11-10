import React from 'react';
import './BtnNav.css';
import Sales from '../Sales/Sales';

function BtnNav(props) {

    const [showResults, setShowResults] = React.useState(false);
    
    return (
        <>
        <div className='btnNav'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button onClick={() => setShowResults(true)} className="btn btn-outline-dark">{props.btnName}</button>
                    </div>
                    <div className="col">
                    <form className="form-inline d-flex" to={props.searchUrl}>
                        <input className="form-control mr-sm-2 border-dark" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-dark my-2 my-sm-0 m-1" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        { showResults ? <Sales /> : null }
        </>
    );
}

export default BtnNav;
