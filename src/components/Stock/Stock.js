import React, { Component } from "react";
import "./Stock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BtnNav from "../BtnNav/BtnNav";
import Tables from "../Tables/Tables";
import AddStock from "./AddStock";
import { Container, Row, Col } from "react-bootstrap";
import Toasts from "../Toasts/Toasts";
import axios from "../../utils/Api";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksData: [],
      showResults: "d-none",
      showBtn: true,
      classesToAdd: "",
      showToasts: false,
      editStock: false,
      formBtnName: "Add Stock",
      isLoading: false,
      page: 1,
      loadMore: true,
    };

    this.editRef = React.createRef();
  }

  componentDidMount() {
    this.getStockData();
  }

  getStockData = () => {
    this.setState({
      loadMore: true,
    });
    axios
      .get("/stocks?_page=" + this.state.page + "&_limit=5")
      .then((res) => {
        if (this.state.page >= 4) {
          this.setState({
            loadMore: false,
          });
        }
        if (this.state.isLoading === false) {
          this.setState({
            stocksData: res.data,
            isLoading: false,
          });
        } else {
          this.setState((prevState) => ({
            stocksData: [...prevState.stocksData, ...res.data],
            isLoading: false,
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  openAddStock = () => {
    this.setState({
      showResults: "d-block",
      showBtn: false,
      classesToAdd: "",
      showToasts: false,
    });
  };

  closeAddStock = () => {
    this.setState(
      {
        showResults: "d-none",
        showBtn: true,
        classesToAdd: "bg-success show",
        showToasts: true,
        editStock: false,
        formBtnName: "Add Stock",
        stocksData: [],
        page: 1,
      },
      function () {
        this.getStockData();
      }
    );
  };

  handleToasts = () => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
    });
  };

  editStock = (id, e) => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
      editStocksId: id,
      showResults: "d-block",
      showBtn: false,
      editStock: true,
      formBtnName: "Update Stock",
    });

    if (this.editRef.current !== null) {
      this.editRef.current.editStocksData(id);
    } else {
      console.log(this.editRef);
    }
  };

  deleteStock = (id, name, e) => {
    const itemName = name;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete " + itemName)) {
      axios
        .delete("/stocks/" + id)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.setState(
              {
                stocksData: [],
                page: 1,
                classesToAdd: "bg-success show",
                showToasts: true,
              },
              function () {
                this.getStockData();
              }
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  searchStock = (e) => {
    this.setState({
      loadMore: false,
    });
    axios
      .get("/stocks?q=" + e.target.search.value + "")
      .then((res) => {
        this.setState({
          stocksData: res.data,
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
        this.getStockData();
      }
    );
  };

  render() {
    const thValues = [
      "Sku",
      "Image",
      "Name",
      "Price",
      "Quantity",
      "Remaining",
      "Category",
      "Action",
    ];

    let data = this.state.stocksData;
    const tdDat = data.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>
          <img
            src={item.img ? item.img : "https://via.placeholder.com/50"}
            alt="img"
          />
        </td>
        <td>{item.name}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.remaining}</td>
        <td>{item.categoryName}</td>
        <td>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.editStock(item.id, e)}
          >
            <FontAwesomeIcon className="m-1" icon={faEdit} />
          </button>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.deleteStock(item.id, item.name, e)}
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
              <div className="stock">
                <h1 className="text- text-uppercase my-3">Stock</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <BtnNav
          btnName="Add Stock"
          search={this.searchStock}
          onBtnClick={this.openAddStock}
          showBtn={this.state.showBtn}
        />
        <AddStock
          showResults={this.state.showResults}
          onBtnClick={this.closeAddStock}
          editStock={this.state.editStock}
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

export default Stock;
