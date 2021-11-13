import React, { Component } from "react";

class AddStock extends Component {
  AddStock = (e) => {
    e.preventDefault();
    console.log("Add Stock Clicked.");

    const {
      productName,
      productPrice,
      productQuantity,
      productCategory,
      productImage,
    } = e.target.elements;

    console.log({
      productName: productName.value,
      productPrice: productPrice.value,
      productQuantity: productQuantity.value,
      productCategory: productCategory.value,
      productImage: productImage.value,
    });

    this.props.onBtnClick(true);
  };

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <form onSubmit={this.AddStock} className="my-3 py-3">
                <div className="row">
                  <div className="col mb-2">
                    <label for="Name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="productName"
                      id="productName"
                      aria-describedby="nameHelp"
                      placeholder="Enter Product Name"
                      className="form-control"
                    />
                  </div>
                  <div className="col mb-2">
                    <label for="Price" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      name="productPrice"
                      id="productPrice"
                      aria-describedby="priceHelp"
                      placeholder="Enter Price"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-2">
                    <label for="Quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="productQuantity"
                      id="productQuantity"
                      aria-describedby="quantityHelp"
                      placeholder="Enter Quantity"
                      className="form-control"
                    />
                  </div>
                  <div className="col mb-2">
                    <label for="Category" className="form-label">
                      Category
                    </label>
                    <select
                      name="productCategory"
                      id="productCategory"
                      aria-label="Catergory"
                      className="form-select"
                    >
                      <option value="">Select Category</option>
                      <option vlaue="cat-1">Category 1</option>
                      <option vlaue="cat-2">Category 2</option>
                      <option vlaue="cat-3">Category 3</option>
                      <option vlaue="cat-4">Category 4</option>
                      <option vlaue="cat-5">Category 5</option>
                      <option vlaue="cat-6">Category 6</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-2">
                    <label for="Product Image" className="form-label">
                      Product Image
                    </label>
                    <input
                      type="file"
                      name="productImage"
                      id="productImage"
                      aria-describedby="imageHelp"
                      placeholder="Upload Product Image"
                      className="form-control"
                    />
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
