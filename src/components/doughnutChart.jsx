import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Doughnut } from "react-chartjs-2";
import Axios from "axios";

class DoughnutChart extends React.Component {
  state = {
    labels: ["GET", "POST", "HEAD"],
    options: {
      responsive: false,
    },
    legend: {
      position: "bottom",
    },
  };

//grab data and set data when component stat
  async componentDidMount() {
    const datasets = [
      {
        data: [1, 2, 3],
        backgroundColor: ["#5bc0de", "#d9534f", "#5cb85c"],
      },
    ];

    const { data: captureDomains } = await Axios.get(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/play"
    );
    this.setState({ captureDomains });

    captureDomains.forEach((element) => {
      if (element.method === "GET") ++datasets[0].data[0];
      else if (element.method === "POST") ++datasets[0].data[1];
      else if (element.method === "HEAD") ++datasets[0].data[2];
    });
    this.setState({ datasets });
  }

  render() {
    return (
      <React.Fragment>
        <h3 className="text-center">
          <small class="text-muted">Capture Methods</small>
        </h3>
        <Doughnut data={this.state} />
      </React.Fragment>
    );
  }
}

export default DoughnutChart;
