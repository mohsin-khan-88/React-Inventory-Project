import React, { Component } from "react";
import "./Categories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BtnNav from "../BtnNav/BtnNav";
import Tables from "../Tables/Tables";
import AddCategories from "./AddCategories";
import { Container, Row, Col } from "react-bootstrap";
import Toasts from "../Toasts/Toasts";
import axios from "../../utils/Api";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesData: [],
      showResults: "d-none",
      showBtn: true,
      classesToAdd: "",
      showToasts: false,
      editCategories: false,
      formBtnName: "Add Category",
      isLoading: false,
      page: 1,
      loadMore: true,
    };

    this.editRef = React.createRef();
  }


  componentDidMount() {
    this.getCategoriesData();
  }

  getCategoriesData = () => {
    this.setState({
      loadMore: true,
    });
    axios
      .get("/stock-categories?_page=" + this.state.page + "&_limit=5")
      .then((res) => {
        if (this.state.page >= 2) {
          this.setState({
            loadMore: false,
          });
        }
        if (this.state.isLoading === false) {
          this.setState({
            categoriesData: res.data,
            isLoading: false,
          });
        } else {
          this.setState((prevState) => ({
            categoriesData: [...prevState.categoriesData, ...res.data],
            isLoading: false,
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  openAddCategories = () => {
    this.setState({
      showResults: "d-block",
      showBtn: false,
      classesToAdd: "",
      showToasts: false,
    });
  };

  closeAddCategories = () => {
    this.setState(
      {
        showResults: "d-none",
        showBtn: true,
        classesToAdd: "bg-success show",
        showToasts: true,
        editCategories: false,
        formBtnName: "Add Categories",
        categoriesData: [],
        page: 1,
      },
      function () {
        this.getCategoriesData();
      }
    );
  };

  handleToasts = () => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
    });
  };

  editCategories = (id, e) => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
      editcategoriesId: id,
      showResults: "d-block",
      showBtn: false,
      editCategories: true,
      formBtnName: "Update Categories",
    });

    if (this.editRef.current !== null) {
      this.editRef.current.editCategoriesData(id);
    } else {
      console.log(this.editRef);
    }
  };

  deleteCategories = (id, title, e) => {
    const itemName = title;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete " + itemName)) {
      axios
        .delete("/stock-categories/" + id)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.setState(
              {
                categoriesData: [],
                page: 1,
                classesToAdd: "bg-success show",
                showToasts: true,
              },
              function () {
                this.getCategoriesData();
              }
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  searchCategories = (e) => {
    this.setState({
      loadMore: false,
    });
    axios
      .get("/stock-categories?q=" + e.target.search.value + "")
      .then((res) => {
        this.setState({
          categoriesData: res.data,
          page: 1,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  loadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
        isLoading: true,
      },
      function () {
        this.getCategoriesData();
      }
    );
  };

  render() {
    const thValues = [
      "#",
      "Name",
      "Type",
      "Action",
    ];

    let data = this.state.categoriesData;
    const tdDat = data.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.catName}</td>
        <td>{item.type}</td>
        <td>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.editCategories(item.id, e)}
          >
            <FontAwesomeIcon className="m-1" icon={faEdit} />
          </button>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.deleteCategories(item.id, item.title, e)}
          >
            <FontAwesomeIcon className="m-1" icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    ));

    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <div className="Categories">
                <h1 className="text- text-uppercase my-3">Categories</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <BtnNav
          btnName="Add Categories"
          search={this.searchCategories}
          onBtnClick={this.openAddCategories}
          showBtn={this.state.showBtn}
        />
        <AddCategories
          showResults={this.state.showResults}
          onBtnClick={this.closeAddCategories}
          editCategories={this.state.editCategories}
          btnName={this.state.formBtnName}
          ref={this.editRef}
        />
        <Tables thValues={thValues} tdData={tdDat} />
        {this.state.loadMore ? (
          <div className="container-fluid btnNav">
            <div className="row">
              <div className="col">
                <button
                  onClick={this.loadMore}
                  className="btn btn-outline-dark d-block mt-3 mb-3 m-auto"
                >
                  {this.state.isLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.showToasts ? (
          <Toasts
            classesToAdd={this.state.classesToAdd}
            handleToasts={this.handleToasts}
            messageToShow="Done!"
          />
        ) : null}
      </>
    );
  }
}

export default Categories;
