import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import "./SalesReport.css";

export class DateCalender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  handleChange = (newValue) => {
    console.log(newValue);
    this.setState({
      value: newValue,
    });
    this.props.dValue = newValue;
  };

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label=""
          value={this.props.dValue}
          onChange={this.props.handleToDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }
}

export default DateCalender;
