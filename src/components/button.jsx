import React, { Component } from "react";
import Axios from "axios";
import DatePicker from "./datePicker";

class Button extends Component {
  state = {
    text: "Start",
    startDate: new Date(),
    endDate: new Date(),
  };

  capture = {
    jobId: 37,
    verbose: 0,
    playbackSpeed: 1000,
    port: 8080,
    securePort: 443,
    requestBufferTime: 10000,
    hostname: "localhost",
    backendServer: "1",
    playbackName: "play2",
  };

  setText = (info) => {
    this.capture.playbackName = info.jobName;
    this.capture.jobId = info.jobId;
    console.log(this.capture);
    this.handleSubmit();
  };

  handleSubmit = async (e) => {
    console.log(this.state);
    //const changeText = { ...this.state.text };
    //e.preventDefault();
    // this.capture.jobName = e.target.id;
    // this.capture.startTime = this.state.startDate;
    // this.capture.endTime = this.state.endDate;
    const { data: message } = await Axios.post(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/play/run",
      this.capture
    );
    console.log(message);
    if (message.localeCompare("success") === 0) {
      this.setState({ text: "In progress..." });
    } else this.setState({ text: "Failed" });
  };

  handleStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleEndDate = (date) => {
    this.setState({
      endDate: date,
    });
  };

  render() {
    return (
      <React.Fragment>
        <td>
          <DatePicker
            selected={this.state.startDate}
            value={this.state.startDate}
            onChange={this.handleStartDate}
            label="Start Date"
          />
        </td>
        <td>
          <DatePicker
            selected={this.state.endDate}
            value={this.state.endDate}
            onChange={this.handleEndDate}
            onSelect={this.handleSelect}
          />
        </td>
        <td>
          <button
            onClick={() => this.setText(this.props)}
            value={this.props.value}
            id={this.props.id}
            className="btn btn-info btn-sm"
            jobId={this.props.jobId}
          >
            {this.state.text}
          </button>
        </td>
      </React.Fragment>
    );
  }
}

export default Button;
