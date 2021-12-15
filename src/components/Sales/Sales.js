import React, { Component } from "react";
import "./Sales.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BtnNav from "../BtnNav/BtnNav";
import Tables from "../Tables/Tables";
import AddSales from "./AddSales";
import { Container, Row, Col } from "react-bootstrap";
import Toasts from "../Toasts/Toasts";
import axios from "../../utils/Api";

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesData: [],
      showResults: "d-none",
      showBtn: true,
      classesToAdd: "",
      showToasts: false,
      editSales: false,
      formBtnName: "Add Sales",
      isLoading: false,
      page: 1,
      loadMore: true,
    };

    this.editRef = React.createRef();
  }

  componentDidMount() {
    this.getSalesData();
  }

  getSalesData = () => {
    this.setState({
      loadMore: true,
    });
    axios
      .get("/sales?_page=" + this.state.page + "&_limit=5")
      .then((res) => {
        if (this.state.page >= 2) {
          this.setState({
            loadMore: false,
          });
        }
        if (this.state.isLoading === false) {
          this.setState({
            salesData: res.data,
            isLoading: false,
          });
        } else {
          this.setState((prevState) => ({
            salesData: [...prevState.salesData, ...res.data],
            isLoading: false,
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  openAddSales = () => {
    this.setState({
      showResults: "d-block",
      showBtn: false,
      classesToAdd: "",
      showToasts: false,
    });
  };

  closeAddSales = () => {
    this.setState(
      {
        showResults: "d-none",
        showBtn: true,
        classesToAdd: "bg-success show",
        showToasts: true,
        editSales: false,
        formBtnName: "Add Sales",
        salesData: [],
        page: 1,
      },
      function () {
        this.getSalesData();
      }
    );
  };

  handleToasts = () => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
    });
  };

  editSales = (id, e) => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
      editSalesId: id,
      showResults: "d-block",
      showBtn: false,
      editSales: true,
      formBtnName: "Update Sales",
    });

    if (this.editRef.current !== null) {
      this.editRef.current.editSalesData(id);
    } else {
      console.log(this.editRef);
    }
  };

  deleteSales = (id, name, e) => {
    const itemName = name;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete " + itemName)) {
      axios
        .delete("/sales/" + id)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.setState(
              {
                salesData: [],
                page: 1,
                classesToAdd: "bg-success show",
                showToasts: true,
              },
              function () {
                this.getSalesData();
              }
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  searchSales = (e) => {
    this.setState({
      loadMore: false,
    });
    axios
      .get("/sales?q=" + e.target.search.value + "")
      .then((res) => {
        this.setState({
          salesData: res.data,
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
        this.getSalesData();
      }
    );
  };

  render() {
    const thValues = [
      "Sku",
      "Name",
      "Price",
      "Quantity",
      "Platform",
      "Action",
    ];

    let data = this.state.salesData;
    const tdDat = data.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.stockId}</th>
        <td>{item.stockName}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.platformName}</td>
        <td>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.editSales(item.id, e)}
          >
            <FontAwesomeIcon className="m-1" icon={faEdit} />
          </button>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.deleteSales(item.id, item.name, e)}
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
              <div className="sales">
                <h1 className="text- text-uppercase my-3">Sales</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <BtnNav
          btnName="Add Sales"
          search={this.searchSales}
          onBtnClick={this.openAddSales}
          showBtn={this.state.showBtn}
        />
        <AddSales
          showResults={this.state.showResults}
          onBtnClick={this.closeAddSales}
          editSales={this.state.editSales}
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

export default Sales;
