import React, { Component } from "react";
import "./Toasts.css";

export class Toasts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: this.props.classesToAdd,
      message: this.props.messageToShow,
    };
  }

  handleToast = () => {
    console.log("Close");
    this.props.handleToasts(false);
  };

  render() {
    return (
      <>
        <div
          className={
            "toast-container align-items-center text-white border-0 position-fixed top-0 end-0 m-3 " +
            this.state.classes
          }
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="messages"
        >
          <div className="d-flex">
            <div className="toast-body">{this.state.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={this.handleToast}
            ></button>
          </div>
        </div>
      </>
    );
  }
}

export default Toasts;
