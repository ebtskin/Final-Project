import React, { Component } from "react";
import Axios from "axios";
import Button from "./button";
import Pagination from "./pagination";
import { paginate } from "./paginate";

class Playback extends Component {
  state = {
    jobs: [],
    message: [],
    text: "Play",
    currentPage: 1,
    pageSize: 5,
  };

  capture = {
    jobName: "",
    startTime: 0,
    endTime: 0,
  };
//change play button text
  changeText = (text) => {
    this.setState({ text });
  };
//grab data
  async componentDidMount() {
    const { data: jobs } = await Axios.get(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/capture/jobs"
    );

    this.setState({ jobs });
  }
//save data when button click
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: count } = this.state.jobs;

    const jobs = paginate(
      this.state.jobs,
      this.state.currentPage,
      this.state.pageSize
    );

    if (count === 0) return <p>There are no jobs in the database.</p>;

    return (
      <React.Fragment>
        <div className="bg-light border rounded">
          <br />
          <p className="text-info text-center">
            {" "}
            Showing {count} available playback jobs in the database.
          </p>
          <table className="table table-hover">
            <thead>
              <tr className="text-secondary">
                <th>Jobs Name</th>
                <th>Start Date & Time</th>
                <th>End Date & Time</th>
                <th>Playback</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.jobID}>
                  <td className="text-info">{job.jobName}</td>

                  <Button
                    id={job.jobName}
                    label="Playback"
                    text={this.state.text}
                    jobName={job.jobName}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <Pagination
          itemsCount={this.state.jobs.length}
          pageSize={this.state.pageSize}
          currentPage={this.state.currentPage}
          onPageChange={this.handlePageChange}
          className="ml-2"
        />
      </React.Fragment>
    );
  }
}

export default Playback;
