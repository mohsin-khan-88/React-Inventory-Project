import React, { Component } from "react";
class AddStock extends Component {
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
      console.log({
        productName: productName.value,
        productPrice: productPrice.value,
        productQuantity: productQuantity.value,
        productCategory: productCategory.value,
        productImage: productImage.value,
      });

      this.props.onBtnClick(true);
    }
  };

  render(props) {
    const stockCategories = [
      {
        catId: "1",
        catName: "Category 1",
      },
      {
        catId: "2",
        catName: "Category 2",
      },
      {
        catId: "3",
        catName: "Category 3",
      },
      {
        catId: "4",
        catName: "Category 4",
      },
      {
        catId: "5",
        catName: "Category 5",
      },
    ];

    const catData = stockCategories.map((category) => (
      <option value={category.catId}>{category.catName}</option>
    ));

    const formData = this.props.editData;

    let productName = "";
    let productPrice = "";
    let productQuantity = "";
    let productCategory = "";
    let productImage = "";

    if (Object.keys(formData).length > 0 && this.props.editStock === true) {
      const tdDat = Object.keys(formData).map((item) => {
        productName = formData[item].name;
        productPrice = formData[item].price;
        productQuantity = formData[item].quantity;
        productCategory = formData[item].category;
        productImage = formData[item].img;
      });
    }

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
                      defaultValue={productName}
                    />
                    <div class="invalid-feedback">Cannot be blank!</div>
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
                      defaultValue={productPrice}
                    />
                    <div class="invalid-feedback">Cannot be blank!</div>
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
                      defaultValue={productQuantity}
                    />
                    <div class="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Category</label>
                    <select
                      name="productCategory"
                      id="productCategory"
                      aria-label="Category"
                      className="form-select"
                      defaultValue={productCategory}
                    >
                      <option value="">Select Category</option>
                      {catData}
                    </select>
                    <div class="invalid-feedback">Please select Category!</div>
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
                    />
                    
                    {this.props.editStock ? <div id="fileHelp" class="form-text">Selected file: {productImage}</div> : null  }
                    
                    <div class="invalid-feedback">
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
