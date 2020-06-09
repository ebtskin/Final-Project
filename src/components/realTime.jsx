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
    const {
      data: jobs,
    } = await Axios.post(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/play/realtime",
      { limit: 100 }
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
            Showing {count} capture traffics jobs in the database.
          </p>
          <table className="table table-hover">
            <thead>
              <tr className="text-secondary">
                <th>JOBID</th>

                <th>UTime</th>
                <th>PROTOCOL</th>
                <th>Host</th>
                <th>METHOD</th>
                <th>URI</th>
                <th>SECURE</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="w-25 text-dark">
                  <td>{job.id}</td>

                  <td>{job.utime}</td>
                  <td>{job.protocol}</td>
                  <td className="w-25 word-wrap">{job.host}</td>

                  <td>{job.method}</td>
                  <td className="w-25 word-wrap">{job.uri}</td>
                  <td className="w-25 word-wrap">{job.secure}</td>
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
