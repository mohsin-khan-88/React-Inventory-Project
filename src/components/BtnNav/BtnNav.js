import React, { Component } from "react";

class BtnNav extends Component {
  changeHandler = () => {
    this.props.onBtnClick(true);
  };

  search = (e) => {
    e.preventDefault();
    if (!e.target.search.value || e.target.search.value === "") {
      e.target.search.className = "form-control mr-sm-2 is-invalid";
      e.target.search.placeholder = 'Type something to search!';
    } else {
        e.target.search.className = "form-control mr-sm-2 border-dark";
      this.props.search(e);
    }
  };

  render() {
    return (
      <div className="container-fluid btnNav">
        <div className="row">
          <div className="col">
            {this.props.showBtn ? (
              <button
                onClick={this.changeHandler}
                className="btn btn-outline-dark"
              >
                {this.props.btnName}
              </button>
            ) : null}
          </div>
          <div className="col">
            <form className="form-inline d-flex" onSubmit={this.search}>
              <input
                name="search"
                className="form-control mr-sm-2 border-dark"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-dark my-2 my-sm-0 m-1"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BtnNav;
