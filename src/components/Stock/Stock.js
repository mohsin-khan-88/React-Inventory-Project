import React, { Component } from "react";
import "./Stock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BtnNav from "../BtnNav/BtnNav";
import Tables from "../Tables/Tables";
import AddStock from "./AddStock";
import { Container, Row, Col } from "react-bootstrap";
import Toasts from "../Toasts/Toasts";
import axios from "axios";

class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stocksData: [],
      editStocksId: 0,
      showResults: false,
      showBtn: true,
      classesToAdd: "",
      showToasts: false,
      editStock: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://my-json-server.typicode.com/mohsin-khan-88/React-Inventory-Project/stocks"
      )
      .then((res) => {
        const stocksData = res.data;
        console.log(stocksData);
        this.setState({ stocksData });
      });
  }

  openAddStock = () => {
    this.setState({
      showResults: true,
      showBtn: false,
      classesToAdd: "",
      showToasts: false,
    });
  };

  closeAddStock = () => {
    this.setState({
      showResults: false,
      showBtn: true,
      classesToAdd: "bg-success show",
      showToasts: true,
    });
  };

  handleToasts = () => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
    });
  };

  editStock = (id, e) => {
    console.log(id);
    this.setState({
      editStocksId: id,
      showResults: true,
      showBtn: false,
      editStock: true,
    });
  };

  deleteStock = (id, e) => {
    console.log("Delete Stock:", id);
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
    const tdDat = data.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>
          <img src={item.img} alt="img" />
        </td>
        <td>{item.name}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.category}</td>
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
        {this.state.showResults ? (
          <AddStock
            onBtnClick={this.closeAddStock}
            editStocksId={this.state.editStocksId}
            editStock={this.state.editStock}
          />
        ) : null}
        <Tables thValues={thValues} tdData={tdDat} />
        {this.state.showToasts ? (
          <Toasts
            classesToAdd={this.state.classesToAdd}
            handleToasts={this.handleToasts}
            messageToShow="Stock added!"
          />
        ) : null}
      </>
    );
  }
}

export default Stock;
