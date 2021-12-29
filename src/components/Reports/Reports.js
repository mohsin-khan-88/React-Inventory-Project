import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Reports.css";
import SalesReport from "./SalesReport";
import ExpenseReports from "./ExpenseReports";

export class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportType: "sales",
    };
  }

  handleChange = (e) => {
    this.setState({
      reportType: e.target.value,
    });
  };

  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <div className="reports">
                <h1 className="text- text-uppercase my-3">Reports</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <div className="reports">
                <form>
                  <label className="salesRadio">
                    <input
                      type="radio"
                      className="me-2"
                      name="reportType salesRadio"
                      value="sales"
                      onChange={this.handleChange}
                      checked={this.state.reportType === "sales"}
                    />
                    Sales
                  </label>
                  <label className="salesRadio">
                    <input
                      type="radio"
                      className="mx-2 salesRadio"
                      name="reportType"
                      value="expense"
                      onChange={this.handleChange}
                      checked={this.state.reportType === "expense"}
                    />
                    Expense
                  </label>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
        {this.state.reportType === "sales" ? <SalesReport /> : null}
        {this.state.reportType === "expense" ? <ExpenseReports />: null}
      </>
    );
  }
}

export default Reports;
