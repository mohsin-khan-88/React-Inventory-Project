import React, { Component } from "react";
import axios from "../../utils/Api";

export class AddPlatforms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platformId: "",
      platformName: "",
    };
  }

  AddPlatform = (e) => {
    e.preventDefault();

    const { platformId, platformName } = e.target.elements;

    const findFormErrors = () => {
      const newErrors = {};

      if (!this.state.platformName || this.state.platformName === "") {
        newErrors.platformName = "Title cannot be blank!";
        platformName.className = "form-control is-invalid";
      } else {
        platformName.className = "form-control is-valid";
      }

      return newErrors;
    };

    // Form Validation
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
    } else {
      const apiData = {
        id: this.state.platformId,
        platform: this.state.platformName,
      };

      const apiSuccess = () => {
        const { platformId, platformName } = e.target.elements;

        // Clear form fields data and errors
        this.setState({
          platformId: "",
          platformName: "",
        });

        platformName.className = "form-control";

        this.props.onBtnClick(true);
      };

      if (!this.state.platformId || this.state.platformId === "") {
        axios
          .post("/platforms", { apiData })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              apiSuccess();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .put("/platforms/" + this.state.platformId, { apiData })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              apiSuccess();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  handleChange = (e) => {
    const inpName = e.target.name;
    if (inpName) {
      this.setState({
        [inpName]: e.target.value,
      });
    }
  };

  editPlatformsData = (id) => {
    window.scrollTo(0, 0);
    axios
      .get("/platforms/" + id)
      .then((res) => {
        const editPlatformsData = res.data;
        this.setState({
          platformId: editPlatformsData.id,
          platformName: editPlatformsData.platform,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <>
        <div className={"container-fluid " + this.props.showResults}>
          <div className="row">
            <div className="col">
              <form
                onSubmit={this.AddPlatform}
                className="my-3 py-3 needs-validation"
                noValidate
              >
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Title</label>
                    <input
                      type="hidden"
                      name="platformId"
                      aria-describedby="idHelp"
                      className="form-control"
                      value={this.state.platformId}
                      onChange={this.handleChange}
                    />
                    <input
                      type="text"
                      name="platformName"
                      aria-describedby="nameHelp"
                      placeholder="Enter Title"
                      className="form-control"
                      value={this.state.platformName}
                      onChange={this.handleChange}
                    />
                    <div className="invalid-feedback">Cannot be blank!</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col my-2">
                    <button className="btn btn-outline-dark">
                      {this.props.btnName}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddPlatforms;
