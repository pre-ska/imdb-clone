import React from "react";
import "./LoadMoreBtn.css";

const LoadMoreBtn = ({ loadMoreItems, text }) => {
  return (
    <div className="rmdb-loadmorebtn" onClick={loadMoreItems}>
      <p>{text}</p>
    </div>
  );
};

export default LoadMoreBtn;
