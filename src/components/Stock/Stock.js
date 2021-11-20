import React, { Component } from "react";
import "./Stock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BtnNav from "../BtnNav/BtnNav";
import Tables from "../Tables/Tables";
import AddStock from "./AddStock";
import { Container, Row, Col } from "react-bootstrap";
import Toasts from "../Toasts/Toasts";

class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showResults: false,
      showBtn: true,
      classesToAdd: "",
      showToasts: false,
      editStock: false
    };
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
    console.log("Edit Stock", id);
    this.setState({
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

    const data = {
      1: {
        img: "https://via.placeholder.com/50",
        name: "Michael Kors",
        price: "12000",
        quantity: "500",
        category: "1",
      },
      2: {
        img: "https://via.placeholder.com/50",
        name: "Mac",
        price: "22000",
        quantity: "1000",
        category: "1",
      },
      3: {
        img: "https://via.placeholder.com/50",
        name: "Burberry",
        price: "23500",
        quantity: "300",
        category: "1",
      },
    };

    const editData = {
      1: {
        img: "https://via.placeholder.com/50",
        name: "Michael Kors",
        price: "12000",
        quantity: "500",
        category: "1",
      },
    };

    const tdDat = Object.keys(data).map((item) => (
      <tr key={item}>
        <th scope="row">{item}</th>
        <td>
          <img src={data[item].img} alt="img" />
        </td>
        <td>{data[item].name}</td>
        <td>${data[item].price}</td>
        <td>{data[item].quantity}</td>
        <td>{data[item].category}</td>
        <td>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.editStock(item, e)}
          >
            <FontAwesomeIcon className="m-1" icon={faEdit} />
          </button>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.deleteStock(item, e)}
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
            editData={editData}
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
