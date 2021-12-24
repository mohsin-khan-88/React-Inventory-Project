import React, { Component } from "react";
import axios from "../../utils/Api";
import Ac from "../Sales/Ac";
import DatePicker from "./DatePicker";

export class SearchSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      stockData: [],
      stockId: "",
      productName: "",
      productPlatform: "",
      toDate: "",
      fromDate: "",
    };
  }

  componentDidMount() {
    this.getPlatforms();
    this.getStockData();
  }

  getPlatforms = () => {
    axios
      .get("/platforms")
      .then((res) => {
        const platforms = res.data;
        this.setState({ platforms });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getStockData = () => {
    axios
      .get("/stocks")
      .then((res) => {
        this.setState({
          stockData: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  searchSales = (e) => {
    e.preventDefault();
    if (
      this.state.stockId === "" &&
      this.state.productName === "" &&
      this.state.productPlatform === "" &&
      this.state.toDate === "" &&
      this.state.fromDate === ""
    ) {
      alert("Please select at least one field to search!");
      return false;
    }

    const apiData = {
      stockId: this.state.stockId,
      name: this.state.productName,
      toDate: this.state.toDate,
      fromDate: this.state.fromDate,
      platform: this.state.productPlatform,
    };

    if (apiData) {
      this.props.searchParam(apiData);
    }
  };

  handleChange = (e, newValue) => {
    if (newValue) {
      this.setState({
        stockId: newValue.id,
        productName: newValue.name,
      });
    } else {
      const inpName = e.target.name;
      this.setState({
        [inpName]: e.target.value,
      });
    }
  };

  render() {
    return (
      <>
        {this.state.newErrors}

        <div className={"container-fluid " + this.props.showResults}>
          <div className="row">
            <div className="col">
              <form
                onSubmit={this.searchSales}
                className="my-3 py-3 needs-validation"
                noValidate
              >
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Name</label>
                    <input
                      type="hidden"
                      name="stockId"
                      aria-describedby="idHelp"
                      className="form-control"
                      value={this.state.stockId}
                      onChange={this.handleChange}
                    />
                    <Ac
                      stockData={this.state.stockData}
                      pId={this.state.productId}
                      pValue={this.state.productName}
                      hc={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Platform</label>
                    <select
                      name="productPlatform"
                      aria-label="Platform"
                      className="form-select"
                      value={this.state.productPlatform}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Platform</option>
                      {this.state.platforms.map((platform) => (
                        <option key={platform.id} value={platform.id}>
                          {platform.platform}
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
                    <input
                      type="text"
                      name="fromDate"
                      aria-describedby="fromDate"
                      placeholder="Enter Date"
                      className="form-control"
                      value={this.state.fromDate}
                      onChange={this.handleChange}
                    />
                    <DatePicker />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">To</label>
                    <input
                      type="text"
                      name="toDate"
                      aria-describedby="toDate"
                      placeholder="Enter Date"
                      className="form-control"
                      value={this.state.toDate}
                      onChange={this.handleChange}
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

export default SearchSales;
