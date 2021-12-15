import React, { Component } from "react";
import axios from "../../utils/Api";

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ExpenseCats: [],
      expenseId: "",
      expenseTitle: "",
      expensePrice: "",
      expenseQuantity: "",
      expenseCategory: "",
    };
  }

  componentDidMount() {
    axios
      .get("/Expense-categories")
      .then((res) => {
        const ExpenseCats = res.data;
        this.setState({ ExpenseCats });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  AddExpense = (e) => {
    e.preventDefault();

    const {
      expenseId,
      expenseTitle,
      expensePrice,
      expenseQuantity,
      expenseCategory,
    } = e.target.elements;

    const findFormErrors = () => {
      const newErrors = {};

      if (!this.state.expenseTitle || this.state.expenseTitle === "") {
        newErrors.expenseTitle = "expense Name cannot be blank!";
        expenseTitle.className = "form-control is-invalid";
      } else {
        expenseTitle.className = "form-control is-valid";
      }
      if (!this.state.expensePrice || this.state.expensePrice === "") {
        newErrors.expensePrice = "expense price cannot be blank!";
        expensePrice.className = "form-control is-invalid";
      } else {
        expensePrice.className = "form-control is-valid";
      }
      if (!this.state.expenseQuantity || this.state.expenseQuantity === "") {
        newErrors.expenseQuantity = "expense quantity cannot be blank!";
        expenseQuantity.className = "form-control is-invalid";
      } else {
        expenseQuantity.className = "form-control is-valid";
      }
      if (!this.state.expenseCategory || this.state.expenseCategory === "") {
        newErrors.expenseCategory = "expense category cannot be blank!";
        expenseCategory.className = "form-control is-invalid";
      } else {
        expenseCategory.className = "form-control is-valid";
      }

      return newErrors;
    };

    // Form Validation
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
    } else {
      const apiData = {
        id: this.state.expenseId,
        name: this.state.expenseTitle,
        price: this.state.expensePrice,
        quantity: this.state.expenseQuantity,
        category: this.state.expenseCategory,
      };

      const apiSuccess = () => {
        const {
          expenseTitle,
          expensePrice,
          expenseQuantity,
          expenseCategory,
        } = e.target.elements;

        // Clear form fields data and errors
        this.setState({
          expenseTitle: "",
          expensePrice: "",
          expenseQuantity: "",
          expenseCategory: "",
        });

        expenseTitle.className = "form-control";
        expensePrice.className = "form-control";
        expenseQuantity.className = "form-control";
        expenseCategory.className = "form-control";

        this.props.onBtnClick(true);
      };

      if (!this.state.expenseId || this.state.expenseId === "") {
        axios
          .post("/Expenses", { apiData })
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
          .put("/Expenses/" + this.state.expenseId, { apiData })
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
    if (inpName) {
      this.setState({
        [inpName]: e.target.value,
      });
    }
  };

  editExpensesData = (id) => {
    window.scrollTo(0, 0);
    axios
      .get("/Expenses/" + id)
      .then((res) => {
        const editExpensesData = res.data;
        this.setState({
          expenseId: editExpensesData.id,
          expenseTitle: editExpensesData.name,
          expensePrice: editExpensesData.price,
          expenseQuantity: editExpensesData.quantity,
          expenseCategory: editExpensesData.category,
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
                onSubmit={this.AddExpense}
                className="my-3 py-3 needs-validation"
                noValidate
              >
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Title</label>
                    <input
                      type="hidden"
                      name="expenseId"
                      aria-describedby="idHelp"
                      className="form-control"
                      value={this.state.expenseId}
                      onChange={this.handleChange}
                    />
                    <input
                      type="text"
                      name="expenseTitle"
                      aria-describedby="nameHelp"
                      placeholder="Enter expense Name"
                      className="form-control"
                      value={this.state.expenseTitle}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Price</label>
                    <input
                      type="text"
                      name="expensePrice"
                      aria-describedby="priceHelp"
                      placeholder="Enter Price"
                      className="form-control"
                      value={this.state.expensePrice}
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
                      name="expenseQuantity"
                      aria-describedby="quantityHelp"
                      placeholder="Enter Quantity"
                      className="form-control"
                      value={this.state.expenseQuantity}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Category</label>
                    <select
                      name="expenseCategory"
                      aria-label="Category"
                      className="form-select"
                      value={this.state.expenseCategory}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Category</option>
                      {this.state.ExpenseCats.map((category) => (
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

export default AddExpense;
