import React from "react";
import CircularProgress from "@mui/material-next/CircularProgress";

import "../CSS/spinloader.css";

const Spinnerloader = () => {
  return (
    <div className="spinner-container">
      <CircularProgress fourColor={false} />
    </div>
  );
};

export default Spinnerloader;
