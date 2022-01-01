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
import Toasts from "./components/Toasts/Toasts";
import axios from "./utils/Api";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_logged_in: false,
      showToasts: false,
      messageToShow: "",
      classesToAdd: "",
    };
  }

  checkLogin = (e) => {
    e.preventDefault();
    const { userEmail, userPassword } = e.target.elements;
    // console.log("Check login email", userEmail.value);
    // console.log("Check login Password", userPassword.value);
    // axios
    //   .get("/login", {
    //     auth: {
    //       email: userEmail.value,
    //       username: userPassword.value, // Bad password
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    if (
      userEmail.value === "bebo@bebo.com" &&
      userPassword.value === "bebo321"
    ) {
      this.setState(
        {
          classesToAdd: "",
          showToasts: false,
        },
        () => {
          this.setState(
            {
              classesToAdd: "bg-success show",
              messageToShow: "You have successfully logged in!",
              showToasts: true,
              is_logged_in: true,
            },
            () => {
              setTimeout(this.handleToasts, 2000);
            }
          );
        }
      );
    } else {
      this.setState(
        {
          classesToAdd: "bg-danger show",
          messageToShow: "Please try again with valid user information!",
          showToasts: true,
        },
        () => {
          setTimeout(this.handleToasts, 2000);
        }
      );
    }
  };

  handleToasts = () => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
    });
  };

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
                    <Login checkLogin={this.checkLogin} />
                  </div>
                </>
              )}
            </div>
          </div>
        </Router>
        {this.state.showToasts ? (
          <Toasts
            classesToAdd={this.state.classesToAdd}
            handleToasts={this.handleToasts}
            messageToShow={this.state.messageToShow}
          />
        ) : null}
      </>
    );
  }
}

export default App;
