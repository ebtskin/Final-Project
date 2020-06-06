import React, { Component } from "react";
import NavBar from "./components/navBar"; //top navbar
import SideBar from "./components/sideBar"; //side navbar
import Stats from "./components/stats"; //bootstrap card stats
import Chart from "./components/doughnutChart"; //chartjs capture methods

import Playback from "./components/playback"; //playback traffic
import CaptureJob from "./components/captureJobs"; //capture traffic
import DateUI from "./components/date"; //date picker
import ReatTime from "./components/realTime"; //real time traffic monitoring

//Main app component
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container">
          <div className="row">
            <div className="col-md-3 bg-light fixed-top">
            </div>
          </div>
        </main>

      </React.Fragment>
    );
  }
}

export default App;
