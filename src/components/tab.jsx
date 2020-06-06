import React, { Component } from "react";

const Tab = () => {
  return (
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" href="#">
          Dashboard
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          Account
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          Setting
        </a>
      </li>
    </ul>
  );
};

export default Tab;
