import React, { Component } from "react";
import "./Expense.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BtnNav from "../BtnNav/BtnNav";
import Tables from "../Tables/Tables";
import AddExpense from "./AddExpense";
import { Container, Row, Col } from "react-bootstrap";
import Toasts from "../Toasts/Toasts";
import axios from "../../utils/Api";

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseData: [],
      showResults: "d-none",
      showBtn: true,
      classesToAdd: "",
      showToasts: false,
      editExpense: false,
      formBtnName: "Add Expense",
      isLoading: false,
      page: 1,
      loadMore: true,
    };

    this.editRef = React.createRef();
  }

  componentDidMount() {
    this.getExpenseData();
  }

  getExpenseData = () => {
    this.setState({
      loadMore: true,
    });
    axios
      .get("/expense?_page=" + this.state.page + "&_limit=5")
      .then((res) => {
        if (this.state.page >= 2) {
          this.setState({
            loadMore: false,
          });
        }
        if (this.state.isLoading === false) {
          this.setState({
            expenseData: res.data,
            isLoading: false,
          });
        } else {
          this.setState((prevState) => ({
            expenseData: [...prevState.expenseData, ...res.data],
            isLoading: false,
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  openAddExpense = () => {
    this.setState({
      showResults: "d-block",
      showBtn: false,
      classesToAdd: "",
      showToasts: false,
    });
  };

  closeAddExpense = () => {
    this.setState(
      {
        showResults: "d-none",
        showBtn: true,
        classesToAdd: "bg-success show",
        showToasts: true,
        editExpense: false,
        formBtnName: "Add Expense",
        expenseData: [],
        page: 1,
      },
      function () {
        this.getExpenseData();
      }
    );
  };

  handleToasts = () => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
    });
  };

  editExpense = (id, e) => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
      editexpenseId: id,
      showResults: "d-block",
      showBtn: false,
      editExpense: true,
      formBtnName: "Update Expense",
    });

    if (this.editRef.current !== null) {
      this.editRef.current.editExpenseData(id);
    } else {
      console.log(this.editRef);
    }
  };

  deleteExpense = (id, title, e) => {
    const itemName = title;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete " + itemName)) {
      axios
        .delete("/expense/" + id)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.setState(
              {
                expenseData: [],
                page: 1,
                classesToAdd: "bg-success show",
                showToasts: true,
              },
              function () {
                this.getExpenseData();
              }
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  searchExpense = (e) => {
    this.setState({
      loadMore: false,
    });
    axios
      .get("/expense?q=" + e.target.search.value + "")
      .then((res) => {
        this.setState({
          expenseData: res.data,
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
        this.getExpenseData();
      }
    );
  };

  trimText = (string, length) => {
    return string.length > length ? string.substring(0, length) +  '...' : string;
  };

  render() {
    const thValues = [
      "#",
      "title",
      "Price",
      "Quantity",
      "Category",
      "Description",
      "Date",
      "Action",
    ];

    let data = this.state.expenseData;
    const tdDat = data.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.title}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.categoryName}</td>
        <td>{this.trimText(item.description, 30)}</td>
        <td>{item.date}</td>
        <td>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.editExpense(item.id, e)}
          >
            <FontAwesomeIcon className="m-1" icon={faEdit} />
          </button>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.deleteExpense(item.id, item.title, e)}
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
              <div className="expense">
                <h1 className="text- text-uppercase my-3">Expense</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <BtnNav
          btnName="Add Expense"
          search={this.searchExpense}
          onBtnClick={this.openAddExpense}
          showBtn={this.state.showBtn}
        />
        <AddExpense
          showResults={this.state.showResults}
          onBtnClick={this.closeAddExpense}
          editExpense={this.state.editExpense}
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

export default Expense;
