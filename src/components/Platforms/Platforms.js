import React, { Component } from "react";
import "./Platforms.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BtnNav from "../BtnNav/BtnNav";
import Tables from "../Tables/Tables";
import AddPlatforms from "./AddPlatforms";
import { Container, Row, Col } from "react-bootstrap";
import Toasts from "../Toasts/Toasts";
import axios from "../../utils/Api";

class Platforms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      platformsData: [],
      showResults: "d-none",
      showBtn: true,
      classesToAdd: "",
      showToasts: false,
      editPlatforms: false,
      formBtnName: "Add Platform",
      isLoading: false,
      page: 1,
      loadMore: true,
    };

    this.editRef = React.createRef();
  }

  componentDidMount() {
    this.getPlatformsData();
  }

  getPlatformsData = () => {
    this.setState({
      loadMore: true,
    });
    axios
      .get("/platforms?_page=" + this.state.page + "&_limit=5")
      .then((res) => {
        if (this.state.page >= 1) {
          this.setState({
            loadMore: false,
          });
        }
        if (this.state.isLoading === false) {
          this.setState({
            platformsData: res.data,
            isLoading: false,
          });
        } else {
          this.setState((prevState) => ({
            platformsData: [...prevState.platformsData, ...res.data],
            isLoading: false,
          }));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  openAddPlatforms = () => {
    this.setState({
      showResults: "d-block",
      showBtn: false,
      classesToAdd: "",
      showToasts: false,
    });
  };

  closeAddPlatforms = () => {
    this.setState(
      {
        showResults: "d-none",
        showBtn: true,
        classesToAdd: "bg-success show",
        showToasts: true,
        editPlatforms: false,
        formBtnName: "Add Platforms",
        platformsData: [],
        page: 1,
      },
      function () {
        this.getPlatformsData();
      }
    );
  };

  handleToasts = () => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
    });
  };

  editPlatforms = (id, e) => {
    this.setState({
      classesToAdd: "",
      showToasts: false,
      editplatformsId: id,
      showResults: "d-block",
      showBtn: false,
      editPlatforms: true,
      formBtnName: "Update Platform",
    });

    if (this.editRef.current !== null) {
      this.editRef.current.editPlatformsData(id);
    } else {
      console.log(this.editRef);
    }
  };

  deletePlatforms = (id, title, e) => {
    const itemName = title;
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete " + itemName)) {
      axios
        .delete("/platforms/" + id)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            this.setState(
              {
                platformsData: [],
                page: 1,
                classesToAdd: "bg-success show",
                showToasts: true,
              },
              function () {
                this.getPlatformsData();
              }
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  searchPlatforms = (e) => {
    this.setState({
      loadMore: false,
    });
    axios
      .get("/platforms?q=" + e.target.search.value + "")
      .then((res) => {
        this.setState({
          platformsData: res.data,
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
        this.getPlatformsData();
      }
    );
  };

  render() {
    const thValues = ["#", "Title", "Action"];

    let data = this.state.platformsData;
    const tdDat = data.map((item) => (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.platform}</td>
        <td>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.editPlatforms(item.id, e)}
          >
            <FontAwesomeIcon className="m-1" icon={faEdit} />
          </button>
          <button
            className="border-0 bg-transparent"
            onClick={(e) => this.deletePlatforms(item.id, item.platform, e)}
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
              <div className="Platforms">
                <h1 className="text- text-uppercase my-3">Platforms</h1>
              </div>
            </Col>
          </Row>
        </Container>
        <BtnNav
          btnName="Add Platforms"
          search={this.searchPlatforms}
          onBtnClick={this.openAddPlatforms}
          showBtn={this.state.showBtn}
        />
        <AddPlatforms
          showResults={this.state.showResults}
          onBtnClick={this.closeAddPlatforms}
          editPlatforms={this.state.editPlatforms}
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

export default Platforms;
