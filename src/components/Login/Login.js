import React, { Component } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";

export class Login extends Component {
  render() {
    return (
      <section className="h-100 gradient-form login">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="logoCon mt-4 mb-4">
                        <FontAwesomeIcon className="logoIcon" icon={faCubes} />
                        <h3 className="text-uppercase text-center logo">
                          Inventory
                        </h3>
                      </div>

                      <form onSubmit={this.props.checkLogin}>
                        <p>Please login to your account</p>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            name="userEmail"
                            className="form-control"
                            placeholder="Email address"
                            required
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            name="userPassword"
                            className="form-control"
                            placeholder="Passsword"
                            required
                          />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-outline-dark mb-3 btn-block">
                            Log in
                          </button>
                          <a className="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>

                        {/* <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger">
                            Create new
                          </button>
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Inventory management system</h4>
                      <p className="small mb-0">
                        Discover assets, track relationships & improve
                        utilization from anywhere, anytime. Efficient inventory
                        tracking &amp; better asset visibility.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
