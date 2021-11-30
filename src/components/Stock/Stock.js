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
    };

    this.editRef = React.createRef();
  }

  componentDidMount() {
    axios
      .get("/stocks")
      .then((res) => {
        const stocksData = res.data;
        this.setState({ stocksData });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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
