import React, { Component } from "react";
import "./Tables.css";

export class Tables extends Component {
  render() {
    const thValues = this.props.thValues;
    const thVal = thValues.map((value) => <th key={value} scope="col">{value}</th>);
    return (
      <>
        <div className="container-fluid tables">
          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-striped table-hover my-3">
                  <thead>
                    <tr>{thVal}</tr>
                  </thead>
                  <tbody>{this.props.tdData}
                  {this.props.tdTotal ? this.props.tdTotal : null}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Tables;
