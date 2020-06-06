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
              <NavBar />
              <SideBar />
              <Chart />
            </div>

            <div className="col-md-9 offset-3">
              <br />
              <br />

              <Stats />
              <br />
              <br />

              <div class="card bg-primary text-white text-center p-3">
                <blockquote class="blockquote mb-0">
                  <DateUI />
                </blockquote>
              </div>
              <br />
              <br />
              <div class="card bg-info text-white text-center p-3">
                <blockquote class="blockquote mb-0 text-white">
                  <h3 className="text-center text-white">Playback Jobs</h3>
                </blockquote>
              </div>

              <Playback />
              <br />
              <br />
              <div class="card bg-success text-white text-center p-3">
                <blockquote class="blockquote mb-0 text-white">
                  <h3 className="text-center text-white">Capture Jobs</h3>
                </blockquote>
              </div>
              <CaptureJob />
              <br />
              <br />
              <div class="card bg-dark text-white text-center p-3">
                <blockquote class="blockquote mb-0 text-white">
                  <h3 className="text-center text-white">Real Time Traffic</h3>
                </blockquote>
              </div>
              <ReatTime />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
