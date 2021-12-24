import React, { Component } from "react";
import axios from "../../utils/Api";
import Ac from "./Ac";

class AddSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      stockData: [],
      productId: "",
      stockId: "",
      productName: "",
      productPrice: "",
      productQuantity: "",
      productPlatform: "",
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

  AddSales = (e) => {
    e.preventDefault();
    const {
      productId,
      productName,
      productPrice,
      productQuantity,
      productPlatform,
    } = e.target.elements;

    const findFormErrors = () => {
      const newErrors = {};

      if (!this.state.productName || this.state.productName === "") {
        newErrors.productName = "Product Name cannot be blank!";
        productName.className = "form-control is-invalid";
      } else {
        productName.className = "form-control is-valid";
      }
      if (!this.state.productPrice || this.state.productPrice === "") {
        newErrors.productPrice = "Product price cannot be blank!";
        productPrice.className = "form-control is-invalid";
      } else {
        productPrice.className = "form-control is-valid";
      }
      if (!this.state.productQuantity || this.state.productQuantity === "") {
        newErrors.productQuantity = "Product quantity cannot be blank!";
        productQuantity.className = "form-control is-invalid";
      } else {
        productQuantity.className = "form-control is-valid";
      }
      if (!this.state.productPlatform || this.state.productPlatform === "") {
        newErrors.productPlatform = "Product platform cannot be blank!";
        productPlatform.className = "form-control is-invalid";
      } else {
        productPlatform.className = "form-control is-valid";
      }
      if (!this.state.stockId || this.state.stockId === "") {
        newErrors.stockId = "Stock Id cannot be blank!";
        console.log("Stock Id cannot be blank!");
      }

      return newErrors;
    };

    // Form Validation
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
    } else {
      const apiData = {
        id: this.state.productId,
        stockId: this.state.stockId,
        name: this.state.productName,
        price: this.state.productPrice,
        quantity: this.state.productQuantity,
        platform: this.state.productPlatform,
      };

      const apiSuccess = () => {
        const { productName, productPrice, productQuantity, productPlatform } =
          e.target.elements;

        // Clear form fields data and errors
        this.setState({
          productId: "",
          stockId: "",
          productName: "",
          productPrice: "",
          productQuantity: "",
          productPlatform: "",
        });

        productName.className = "form-control";
        productPrice.className = "form-control";
        productQuantity.className = "form-control";
        productPlatform.className = "form-control";

        this.props.onBtnClick(true);
      };

      if (!this.state.productId || this.state.productId === "") {
        axios
          .post("/sales", { apiData })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              apiSuccess();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .put("/sales/" + this.state.productId, { apiData })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              apiSuccess();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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

  editSalesData = (id) => {
    window.scrollTo(0, 0);
    axios
      .get("/sales/" + id)
      .then((res) => {
        const editSalessData = res.data;
        console.log(editSalessData);
        this.setState({
          productId: editSalessData.id,
          stockId: editSalessData.stockId,
          productName: editSalessData.stockName,
          productPrice: editSalessData.price,
          productQuantity: editSalessData.quantity,
          productPlatform: editSalessData.platformId,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className={"container-fluid AddSales " + this.props.showResults}>
          <div className="row">
            <div className="col">
              <form
                onSubmit={this.AddSales}
                className="my-3 py-3 needs-validation"
                noValidate
              >
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Name</label>
                    <input
                      type="hidden"
                      name="productId"
                      aria-describedby="idHelp"
                      className="form-control"
                      value={this.state.productId}
                      onChange={this.handleChange}
                    />
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
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      name="productPrice"
                      aria-describedby="priceHelp"
                      placeholder="Enter Price"
                      className="form-control"
                      value={this.state.productPrice}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Quantity</label>
                    <input
                      type="text"
                      name="productQuantity"
                      aria-describedby="quantityHelp"
                      placeholder="Enter Quantity"
                      className="form-control"
                      value={this.state.productQuantity}
                      onChange={this.handleChange}
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
                  <div className="col my-2">
                    <button className="btn btn-outline-dark">
                      {this.props.btnName}
                    </button>
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

export default AddSales;
