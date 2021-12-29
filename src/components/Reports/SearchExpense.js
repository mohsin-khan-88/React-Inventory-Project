import React, { Component } from "react";
import axios from "../../utils/Api";
import Ac from "../Sales/Ac";
import DateCalender from "./DateCalender";

export class SearchExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      stockData: [],
      title: "",
      productCategory: "",
      toDate: "",
      fromDate: "",
    };
  }

  componentDidMount() {
    this.getCategory();
  }

  getCategory = () => {
    const prams = {
      typeId: "1",
    };
    axios
      .get("/stock-categories", prams)
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  searchExpense = (e) => {
    e.preventDefault();
    if (
      this.state.title === "" &&
      this.state.productCategory === "" &&
      this.state.toDate === "" &&
      this.state.fromDate === ""
    ) {
      alert("Please select at least one field to search!");
      return false;
    }

    const apiData = {
      title: this.state.title,
      toDate: this.state.toDate,
      fromDate: this.state.fromDate,
      category: this.state.productCategory,
    };

    if (apiData) {
      this.props.searchParam(apiData);
    }
  };

  handleChange = (e) => {
    const inpName = e.target.name;
    this.setState({
      [inpName]: e.target.value,
    });
  };

  hcDatePickerFrom = (newValue) => {
    this.setState({
      fromDate: newValue,
    });
  };

  hcDatePickerTo = (newValue) => {
    this.setState({
      toDate: newValue,
    });
  };

  render() {
    return (
      <>
        <div className={"container-fluid " + this.props.showResults}>
          <div className="row">
            <div className="col">
              <form
                onSubmit={this.searchExpense}
                className="my-3 py-3 needs-validation"
                noValidate
              >
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Category</label>
                    <select
                      name="productCategory"
                      aria-label="category"
                      className="form-select"
                      value={this.state.productCategory}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Category</option>
                      {this.state.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.catName}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Please select Platform!
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">From</label>
                    <DateCalender
                      dValue={this.state.fromDate}
                      handleToDate={this.hcDatePickerFrom}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">To</label>
                    <DateCalender
                      dValue={this.state.toDate}
                      handleToDate={this.hcDatePickerTo}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col my-2">
                    <button className="btn btn-outline-dark">Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SearchExpense;
