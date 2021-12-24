import React, { Component } from "react";
import Tables from "../Tables/Tables";
import axios from "../../utils/Api";
import SearchSales from "./SearchSales";

export class SalesReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      salesData: [],
      isLoading: false,
      page: 1,
      loadMore: true,
    };

    this.editRef = React.createRef();
  }

  componentDidMount() {
    // this.getSalesData();
  }

  handleSearchRequest = (apiData) => {
    if (apiData) {
      const page = 1;
      this.setState(
        {
          page: 1,
          apiData: apiData,
        },
        this.getSalesData(apiData, page)
      );
    } else {
      this.getSalesData();
    }
  };

  getSalesData = (apiData, page) => {
    if (apiData) {
      apiData = apiData;
    } else {
      apiData = this.state.apiData;
    }
    if (page) {
      page = page;
    } else {
      page = this.state.page;
    }
    this.setState({
      loadMore: true,
    });
    axios
      .get("/sales?_page=" + page + "&_limit=5", apiData)
      .then((res) => {
        console.log(res);
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
    const thValues = ["Sku", "Name", "Price", "Quantity", "Platform", "Date"];

    let data = this.state.salesData;
    const tdDat = data.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.stockId}</th>
        <td>{item.stockName}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>{item.platformName}</td>
        <td>{item.date}</td>
      </tr>
    ));

    const tdTotal = (
      <tr key="1" className="border-total">
        <td>&nbsp;</td>
        <th>Total</th>
        <th>$250000</th>
        <td colSpan="3">&nbsp;</td>
      </tr>
    );

    return (
      <>
        <SearchSales searchParam={this.handleSearchRequest} />
        {this.state.salesData != "" ? (
          <Tables thValues={thValues} tdData={tdDat} tdTotal={tdTotal} />
        ) : null}
        {this.state.salesData != "" && this.state.loadMore === true ? (
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
      </>
    );
  }
}

export default SalesReport;
