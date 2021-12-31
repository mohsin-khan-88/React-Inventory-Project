import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Stock from "./components/Stock/Stock";
import Sales from "./components/Sales/Sales";
import Reports from "./components/Reports/Reports";
import Expense from "./components/Expense/Expense";
import Categories from "./components/Categories/Categories";
import Platforms from "./components/Platforms/Platforms";
import Login from "./components/Login/Login";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_logged_in: false,
    };
  }

  render() {
    return (
      <>
        <Router>
          <div className="container-fluid m-0 p-0">
            <div className="row m-0 p-0">
              {this.state.is_logged_in === true ? (
                <>
                  <Sidebar />
                  <div className="col col-md-9">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/stock" element={<Stock />} />
                      <Route path="/sales" element={<Sales />} />
                      <Route path="/expense" element={<Expense />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/platforms" element={<Platforms />} />
                    </Routes>
                  </div>
                </>
              ) : (
                <>
                  <div className="col m-0 p-0">
                    <Login />
                  </div>
                </>
              )}
            </div>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
