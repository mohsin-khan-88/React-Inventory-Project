import React, { Component } from "react";
import axios from "../../utils/Api";

class AddStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockCats: [],
      productId: "",
      productName: "",
      productPrice: "",
      productQuantity: "",
      productCategory: "",
      productImage: [],
      productImageName: "",
    };
  }

  componentDidMount() {
    axios
      .get("/stock-categories")
      .then((res) => {
        const stockCats = res.data;
        this.setState({ stockCats });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  AddStock = (e) => {
    e.preventDefault();

    const {
      productId,
      productName,
      productPrice,
      productQuantity,
      productCategory,
      productImage,
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
      if (!this.state.productCategory || this.state.productCategory === "") {
        newErrors.productCategory = "Product category cannot be blank!";
        productCategory.className = "form-control is-invalid";
      } else {
        productCategory.className = "form-control is-valid";
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
        name: this.state.productName,
        price: this.state.productPrice,
        quantity: this.state.productQuantity,
        category: this.state.productCategory,
        img: this.state.productImage,
      };

      console.log(apiData);

      const apiSuccess = () => {
        const {
          productName,
          productPrice,
          productQuantity,
          productCategory,
          productImage,
        } = e.target.elements;

        // Clear form fields data and errors
        this.setState({
          productName: "",
          productPrice: "",
          productQuantity: "",
          productCategory: "",
          productImage: [],
          productImageData: "",
        });

        productName.className = "form-control";
        productPrice.className = "form-control";
        productQuantity.className = "form-control";
        productCategory.className = "form-control";
        productImage.className = "form-control";

        this.props.onBtnClick(true);
      };

      if (!this.state.productId || this.state.productId === "") {
        axios
          .post("/stocks", { apiData })
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
          .put("/stocks/" + this.state.productId, { apiData })
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

  handleChange = (e) => {
    const inpName = e.target.name;
    if (inpName === "productImage") {
      this.setState({
        [inpName]: e.target.files,
      });
    } else {
      this.setState({
        [inpName]: e.target.value,
      });
    }
  };

  editStocksData = (id) => {
    axios
      .get("/stocks/" + id)
      .then((res) => {
        const editStocksData = res.data;
        this.setState({
          productId: editStocksData.id,
          productName: editStocksData.name,
          productPrice: editStocksData.price,
          productQuantity: editStocksData.quantity,
          productCategory: editStocksData.category,
          productImageData: editStocksData.img,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className={"container-fluid " + this.props.showResults}>
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
                      type="hidden"
                      name="productId"
                      aria-describedby="idHelp"
                      className="form-control"
                      value={this.state.productId}
                      onChange={this.handleChange}
                    />
                    <input
                      type="text"
                      name="productName"
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
                    <label className="form-label">Category</label>
                    <select
                      name="productCategory"
                      aria-label="Category"
                      className="form-select"
                      value={this.state.productCategory}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Category</option>
                      {this.state.stockCats.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.catName}
                        </option>
                      ))}
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
                      aria-describedby="imageHelp"
                      placeholder="Upload Product Image"
                      className="form-control"
                      data-filevalue={this.state.productImageData}
                      onChange={this.handleChange}
                    />

                    {this.props.editStock ? (
                      <div id="fileHelp" className="form-text">
                        Selected file: {this.state.productImageData}
                      </div>
                    ) : null}

                    <div className="invalid-feedback">
                      Please select product image!
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

export default AddStock;
