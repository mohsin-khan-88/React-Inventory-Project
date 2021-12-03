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
    console.log("getStockData is called");
    this.setState({
      isLoading: true,
    });
    axios
      .get("/stocks?_page=" + this.state.page + "&_limit=10")
      .then((res) => {
        console.log(res.data.length);
        if (res.data.length < 10) {
          this.setState({
            loadMore: false,
          });
        }
        this.setState((prevState, loadMore) => ({
          stocksData: [...prevState.stocksData, ...res.data],
          isLoading: false,
          page: prevState.page + 1,
          loadMore: loadMore,
        }));
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
    this.setState({
      showResults: "d-none",
      showBtn: true,
      classesToAdd: "bg-success show",
      showToasts: true,
      editStock: false,
      formBtnName: "Add Stock",
    });
    this.getStockData();
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

  deleteStock = (id, e) => {
    const itemName = this.state.stocksData[id - 1].name;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete " + itemName)) {
      axios
        .delete("/stocks/" + id)
        .then((res) => {
          if (res.status == 200 || res.status === 201) {
            this.setState({
              classesToAdd: "bg-success show",
              showToasts: true,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.getStockData();
    }
  };

  loadMore = () => {
    console.log("loadmore");
    this.getStockData();
  };

  render() {
    const thValues = [
      "#",
      "Image",
      "Name",
      "Price",
      "Quantity",
      "Category",
      "Action",
    ];

    let data = this.state.stocksData;
    console.log(data);
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
            onClick={(e) => this.deleteStock(item.id, e)}
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
          searchUrl="/stock"
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
