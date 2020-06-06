import React from "react";

//sidebar menu with fixed top
const NavBar = () => {
  return (
    <div className="row">
      <div className="mx-auto bg-light text-center">
        <br />
        <br />
        <br />
        <h3>
          <small class="text-muted">Profile</small>
        </h3>
        <div>
          <img
            className="rounded-circle img-responsive mx-auto d-block"
            alt="profile"
            src={require("./avatar.jpg")}
          />
        </div>
        <div className="p-2 text-center text-primary">
          James Vo
          <p class=" text-muted font-weight-bold text-udivpercase text-center">
            Admin
          </p>
          <div className="text-center">
            <button type="button" className="btn btn-success btn-sm">
              Account
            </button>
            <button type="button" className="btn btn-danger btn-sm m-2">
              Setting
            </button>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
