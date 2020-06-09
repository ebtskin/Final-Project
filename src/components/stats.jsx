import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Axios from "axios";
class Stats extends Component {
  state = {
    captureJobs: 0,
    inProgressJobs: {
      inprogress: [],
      completed: [],
    },
    captureJobs: {
      completed: [],
      inprogress: [],
      failed: [],
    },
    captureDomains: 0,
  };

  //Make api call to get data from the server
  async componentDidMount() {
    const { data: inProgressJobs } = await Axios.get(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/capture/status"
    );
    const { data: captureDomains } = await Axios.get(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/play"
    );

    const { data: captureJobs } = await Axios.post(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/play/status"
    );

    //Set the states
    this.setState({ inProgressJobs });
    this.setState({ captureJobs });
    this.setState({ captureDomains });
    console.log(captureJobs);
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <div>
          <h3>
            <small class="text-muted">Traffic Statistic</small>
          </h3>
        </div>
        <div class="row">
          <div class="col-xl-4 col-sm-6 py-2">
            <div class="card-body bg-success text-white">
              <i class="fa fa-camera-retro fa-3x"></i>
              <h6 class="text-uppercase">Captured Request</h6>
              <h1 class="display-4">{this.state.captureDomains.length} </h1>
            </div>
          </div>
          <div class="col-xl-4 col-sm-6 py-2">
            <div class="card-body bg-danger text-white">
              <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
              <h6 class="text-uppercase">Capture Jobs</h6>
              <h1 class="display-4">
                {this.state.inProgressJobs.inprogress.length}
              </h1>
            </div>
          </div>
          <div class="col-xl-4 col-sm-6 py-2">
            <div class="card-body bg-info text-white">
              <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
              <h6 class="text-uppercase">Playback Jobs</h6>
              <h1 class="display-4">
                {this.state.captureJobs.inprogress.length}
              </h1>
            </div>
          </div>
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default Stats;

