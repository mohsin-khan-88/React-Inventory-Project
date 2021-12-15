import React, { Component } from "react";
import axios from "../../utils/Api";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

class Ac extends Component {
  render() {
    return (
      <Autocomplete
        value={this.props.pValue}
        onChange={this.props.hc}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="productName"
        options={this.props.stockData}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.id + " - " + option.name;
        }}
        renderOption={(props, option) => (
          <li {...props}>{option.id + " - " + option.name}</li>
        )}
        // sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Enter Product Name"
            size="small"
          />
        )}
      />
    );
  }
}

export default Ac;
