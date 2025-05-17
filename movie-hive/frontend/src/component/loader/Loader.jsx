import React from "react";
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner">
        <div className="reel"></div>
        <div className="reel"></div>
        <div className="reel"></div>
        
      </div>
      <p className="loading-text">Please Wait ...</p>
    </div>
  );
};

export default Loader;
