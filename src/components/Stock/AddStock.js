import React, { Component, useState, useEffect } from "react";
import axios from "axios";
class AddStock extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();

    this.state = {
      productId: 0,
      productName: "",
      productPrice: "",
      productQuality: "",
      productCategory: "",
      productImage: "",
    };
  }

  componentDidMount() {
    const apiUrl =
      "https://my-json-server.typicode.com/mohsin-khan-88/React-Inventory-Project/stocks/" +
      this.props.editStocksId;
    axios.get(apiUrl).then((res) => {
      const editStocksData = res.data;
      console.log(editStocksData);
      this.setState({
        productId: editStocksData.id,
        productName: editStocksData.name,
        productPrice: editStocksData.price,
        productQuantity: editStocksData.quantity,
        productCategory: editStocksData.category,
        productImage: editStocksData.img,
      });
    });
  }

  AddStock = (e) => {
    e.preventDefault();

    const {
      productName,
      productPrice,
      productQuantity,
      productCategory,
      productImage,
    } = e.target.elements;

    const findFormErrors = () => {
      const newErrors = {};

      if (!productName.value || productName.value === "") {
        newErrors.productName = "Product Name cannot be blank!";
        productName.className = "form-control is-invalid";
      } else {
        productName.className = "form-control is-valid";
      }
      if (!productPrice.value || productPrice.value === "") {
        newErrors.productPrice = "Product price cannot be blank!";
        productPrice.className = "form-control is-invalid";
      } else {
        productPrice.className = "form-control is-valid";
      }
      if (!productQuantity.value || productQuantity.value === "") {
        newErrors.productQuantity = "Product quantity cannot be blank!";
        productQuantity.className = "form-control is-invalid";
      } else {
        productQuantity.className = "form-control is-valid";
      }
      if (!productCategory.value || productCategory.value === "") {
        newErrors.productCategory = "Product category cannot be blank!";
        productCategory.className = "form-control is-invalid";
      } else {
        productCategory.className = "form-control is-valid";
      }
      if (!productImage.value || productImage.value === "") {
        newErrors.productImage = "Product image cannot be blank!";
        productImage.className = "form-control is-invalid";
      } else {
        productImage.className = "form-control is-valid";
      }

      return newErrors;
    };

    // Form Validation
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
    } else {
      this.setState({
        productName: productName.value,
        productPrice: productPrice.value,
        productQuantity: productQuantity.value,
        productCategory: productCategory.value,
        productImage: productImage.value,
      });

      this.props.onBtnClick(true);
    }
  };

  handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
    const inpName = e.target.name;
    this.setState({
      [inpName]: e.target.value,
    });
  };

  render(props) {
    const stockCategories = {
      1: {
        id: 1,
        catName: "Category 1",
      },
      2: {
        id: 2,
        catName: "Category 2",
      },
      3: {
        id: 3,
        catName: "Category 3",
      },
      4: {
        id: 4,
        catName: "Category 4",
      },
      5: {
        id: 5,
        catName: "Category 5",
      },
    };

    const catData = Object.keys(stockCategories).map((category) => (
      <option key={category} value={stockCategories[category].id}>
        {stockCategories[category].catName}
      </option>
    ));

    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <form
                onSubmit={this.AddStock}
                className="my-3 py-3 needs-validation"
                noValidate
              >
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      aria-describedby="nameHelp"
                      placeholder="Enter Product Name"
                      className="form-control"
                      value={this.state.productName}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      name="productPrice"
                      id="productPrice"
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
                      id="productQuantity"
                      aria-describedby="quantityHelp"
                      placeholder="Enter Quantity"
                      className="form-control"
                      value={this.state.productQuantity}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Category</label>
                    <select
                      name="productCategory"
                      id="productCategory"
                      aria-label="Category"
                      className="form-select"
                      value={this.state.productCategory}
                      onChange={this.handleChange}
                    >
                      {catData}
                    </select>
                    <div className="invalid-feedback">
                      Please select Category!
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Product Image</label>
                    <input
                      type="file"
                      name="productImage"
                      id="productImage"
                      aria-describedby="imageHelp"
                      placeholder="Upload Product Image"
                      className="form-control"
                      ref={this.fileInput}
                    />

                    {this.props.editStock ? (
                      <div id="fileHelp" className="form-text">
                        Selected file: {this.state.productImage}
                      </div>
                    ) : null}

                    <div className="invalid-feedback">
                      Please select product image!
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col my-2">
                    <button className="btn btn-outline-dark">Add Stock</button>
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

export default AddStock;
