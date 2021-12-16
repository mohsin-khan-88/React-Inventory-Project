import React, { Component } from "react";
import axios from "../../utils/Api";

export class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryTypes: [
        {
          id: 1,
          type: "Stock",
        },
        {
          id: 2,
          type: "Expense",
        },
      ],
      categoryId: "",
      categoryName: "",
      categoryType: "",
    };
  }

  componentDidMount() {
    //   axios
    //     .get("/stock-categories")
    //     .then((res) => {
    //       const categoryTypes = res.data;
    //       this.setState({ categoryTypes });
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
  }

  AddCategory = (e) => {
    e.preventDefault();

    const { categoryId, categoryName, category } = e.target.elements;

    const findFormErrors = () => {
      const newErrors = {};

      if (!this.state.categoryName || this.state.categoryName === "") {
        newErrors.categoryName = "Categories title cannot be blank!";
        categoryName.className = "form-control is-invalid";
      } else {
        categoryName.className = "form-control is-valid";
      }
      if (!this.state.category || this.state.category === "") {
        newErrors.category = "Categories category cannot be blank!";
        category.className = "form-control is-invalid";
      } else {
        category.className = "form-control is-valid";
      }

      return newErrors;
    };

    // Form Validation
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
    } else {
      const apiData = {
        id: this.state.categoryId,
        name: this.state.categoryName,
        category: this.state.category,
        description: this.state.categoriesDescription,
      };

      const apiSuccess = () => {
        const { categoryName, category } = e.target.elements;

        // Clear form fields data and errors
        this.setState({
          categoryName: "",
          category: "",
        });

        categoryName.className = "form-control";
        category.className = "form-control";

        this.props.onBtnClick(true);
      };

      if (!this.state.categoryId || this.state.categoryId === "") {
        axios
          .post("/categories", { apiData })
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
          .put("/categories/" + this.state.categoryId, { apiData })
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

  editCategoriesData = (id) => {
    window.scrollTo(0, 0);
    axios
      .get("/categories/" + id)
      .then((res) => {
        const editCategoriesData = res.data;
        this.setState({
          categoryId: editCategoriesData.id,
          categoryName: editCategoriesData.title,
          category: editCategoriesData.category,
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
                onSubmit={this.AddCategory}
                className="my-3 py-3 needs-validation"
                noValidate
              >
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Title</label>
                    <input
                      type="hidden"
                      name="categoryId"
                      aria-describedby="idHelp"
                      className="form-control"
                      value={this.state.categoryId}
                      onChange={this.handleChange}
                    />
                    <input
                      type="text"
                      name="categoryName"
                      aria-describedby="nameHelp"
                      placeholder="Enter Title"
                      className="form-control"
                      value={this.state.categoryName}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Type</label>
                    <select
                      name="category"
                      aria-label="Category"
                      className="form-select"
                      value={this.state.category}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Type</option>
                      {this.state.categoryTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.type}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Please select Type!</div>
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

export default AddCategory;
