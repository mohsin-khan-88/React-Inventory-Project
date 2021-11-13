import React, { Component } from "react";
import "./Stock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import BtnNav from "../BtnNav/BtnNav";
import Tables from "../Tables/Tables";
import AddStock from "./AddStock";
import { Container, Row, Col } from "react-bootstrap";

class Stock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showResults: false,
      showBtn: true
    };
  }

  openAddStock = () => {
    this.setState({
      showResults: true,
      showBtn: false
    });
  };

  closeAddStock = () => {
    this.setState({
      showResults: false,
      showBtn: true
    });
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
    const data = [
      {
        id: 1,
        img: "https://via.placeholder.com/50",
        name: "Michael Kors",
        price: "12000",
        quantity: "500",
        category: "Bags",
      },
      {
        id: 2,
        img: "https://via.placeholder.com/50",
        name: "Mac",
        price: "22000",
        quantity: "1000",
        category: "Bags",
      },
      {
        id: 3,
        img: "https://via.placeholder.com/50",
        name: "Burberry",
        price: "23500",
        quantity: "300",
        category: "Bags",
      },
      {
        id: 4,
        img: "https://via.placeholder.com/50",
        name: "Calvin Klein",
        price: "12500",
        quantity: "50",
        category: "Bags",
      },
      {
        id: 5,
        img: "https://via.placeholder.com/50",
        name: "Gucci",
        price: "32000",
        quantity: "700",
        category: "Bags",
      },
      {
        id: 6,
        img: "https://via.placeholder.com/50",
        name: "Gucci",
        price: "3000",
        quantity: "90",
        category: "Watches",
      },
      {
        id: 7,
        img: "https://via.placeholder.com/50",
        name: "Rado",
        price: "2000",
        quantity: "30",
        category: "Watches",
      },
    ];

    const tdData = data;
    const tdDat = tdData.map((data) => (
      <tr key={data.id}>
        <th scope="row">{data.id}</th>
        <td>
          <img src={data.img} alt="img" />
        </td>
        <td>{data.name}</td>
        <td>${data.price}</td>
        <td>{data.quantity}</td>
        <td>{data.category}</td>
        <td>
          <Link to={"/stockEdit?id=" + data.id}>
            <FontAwesomeIcon className="m-1" icon={faEdit} />
          </Link>
          <Link to={"/stockDelete?id=" + data.id}>
            <FontAwesomeIcon className="m-1" icon={faTrashAlt} />
          </Link>
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
        {this.state.showResults ? <AddStock onBtnClick={this.closeAddStock} /> : null}
        <Tables thValues={thValues} tdData={tdDat} />
      </>
    );
  }
}

export default Stock;
