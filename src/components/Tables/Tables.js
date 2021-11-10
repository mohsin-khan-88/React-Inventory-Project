import React from 'react';
import './Tables.css';

function Tables(props) {

    const thValues = props.thValues;
    const thVal = thValues.map((value) =>
      <th scope="col">{value}</th>
    );


    return (
        <>
        
        <div className="container tables">
            <div className="row">
                <div className="col">
                    <div className="table-responsive">
                    <table className="table table-striped table-hover my-3">
                        <thead>
                            <tr>
                             {thVal}
                            </tr>
                        </thead>
                        <tbody>
                            {props.tdData}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Tables;
