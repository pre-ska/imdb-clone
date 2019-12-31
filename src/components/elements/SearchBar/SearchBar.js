import React, { Component, useState, useRef } from "react";
import "./SearchBar.css";
import FontAwesome from "react-fontawesome";

class SearchBar extends Component {
  state = {
    value: ""
  };
  // const [value, setValue] = useState("");
  // const valueRef = useRef(value);

  timer = null;

  doSearch = e => {
    console.log("searching......");
    // setValue(e.target.value);
    this.setState({
      value: e.target.value
    });

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.props.searchItems(this.state.value);
    }, 500);
  };

  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="search"
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
