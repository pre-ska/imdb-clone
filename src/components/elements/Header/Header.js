import React from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";

const Header = ({ reload }) => {
  const history = useHistory();
  const testIf = () => {
    // console.log(window.location);
    // console.log(history);
    if (history.location.pathname === "/") reload();
    else history.push("/");
  };
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        {/* <Link to="/"> */}
        <div onClick={testIf} style={{ cursor: "pointer" }}>
          <img
            src="./images/reactMovie_logo.png"
            alt="logo"
            className="rmdb-logo"
          />
        </div>
        {/* </Link> */}
        <img
          src="./images/tmdb_logo.png"
          alt="tmdb-logo"
          className="rmdb-tmdb-logo"
        />
      </div>
    </div>
  );
};

export default Header;
