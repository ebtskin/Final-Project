import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Date = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-secondary justify-content-between fixed-top">
        <a className="navbar-brand mx-auto text-white" href="/" alt="logo">
          Traffic Playback
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nav-items"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav-items">
          <div className="navbar-nav ml-auto">
            <a className="nav-item nav-link" href="/login">
              Login <span className="sr-only">(current)</span>
            </a>
            <a className="nav-item nav-link" href="/signUp">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Date;
