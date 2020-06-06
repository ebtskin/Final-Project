import React, { Component } from "react";
import Axios from "axios";
import Pagination from "./pagination";
import { paginate } from "./paginate";

class RealTime extends Component {
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

  changeText = (text) => {
    this.setState({ text });
  };

  async componentDidMount() {
    const { data: jobs } = await Axios.get(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/play"
    );

    this.setState({ jobs });
  }

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

    if (count === 0) return <p>There are no job in the database.</p>;

    return (
      <React.Fragment>
        <div className="bg-light border rounded text-secondary">
          <br />
          <p className="text-center text-secondary">
            {" "}
            Showing {count} available playback jobs in the database.
          </p>
          <table className="table table-hover">
            <thead>
              <tr className="text-secondary">
                <th>JOBID</th>
                <th>UTime</th>
                <th>Host</th>
                <th>METHOD</th>
                <th>URI</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="w-25 text-dark">
                  <td>{job.id}</td>
                  <td>{job.utime}</td>
                  <td className="w-25 word-wrap">{job.host}</td>

                  <td>{job.method}</td>
                  <td className="w-25 word-wrap">{job.uri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div className="w-50 word-wrap">
          {" "}
          <Pagination
            itemsCount={this.state.jobs.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
            className="ml-2"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default RealTime;

