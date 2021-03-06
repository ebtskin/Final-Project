import React from "react";
import {
  Dropdown,
  Form,
  Button,
  Spinner,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";

class TrafficStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: false,
    };
  }

//get data from api call
  componentDidMount = () => {
    let url = "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/play";
    fetch(url)
      .then((res) => {
        if (res.json) {
          return res.json().then((json) => {
            return res.ok ? json : Promise.reject(json);
          });
        } else {
          Promise.reject("No JSON exist!");
        }
      })
      .then((result) => {
        console.log(result);
        this.setState({ data: result, error: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  };

//render the chart
  render() {
    return (
      <div>
        <StatsChart data={this.state.data} />
      </div>
    );
  }
}


//charjs colors
const lineColors = [
  "rgb(237, 41, 58)",
  "rgb(75,192,192)",
  "rgb(230,54,192)",
  "rgb(100, 53, 201)",
  "rgb(33, 133, 208)",
];

//charjs options
const options = {
  responsive: true,
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Dates",
        },
      },
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "# of Requests",
        },
      },
    ],
  },
};

class StatsChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lineData: {},
    };
  }

  // handle new request and update the line chart, result param received from StatsChartOptionsBar.
  handleUpdate = (result) => {
    if (!result) return null;
    let i = 0;
    // update data to the line chart
    let lineData = {};
    lineData.datasets = [];
    lineData.labels = result.labels;
    result.data.forEach((uri) => {
      lineData.datasets.push({
        label: `uri(${uri.name})`,
        data: uri.traffic,
        fill: false,
        lineTension: 0.1,
        backgroundColor: lineColors[i],
        borderColor: lineColors[i],
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: lineColors[i],
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: lineColors[i],
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      });
      ++i;
    });
    this.setState({ lineData: lineData });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h2>Traffic Analysis Chart</h2>
          <StatsChartOptionsBar
            data={this.props.data}
            lineHandler={this.handleUpdate}
          />
          <hr></hr>
          <div className="bg-light rounded border">
            <Line data={this.state.lineData} options={options} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class StatsChartOptionsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uriList: [
        "/home",
        "/home/uri",
        "/traffic/abc/dsassfcsaaaaaaaaa",
        "/hello",
        "/hi",
        "/abc",
      ],
      uriListVisible: [true, true, true, true, true, true],
      applyLoading: false,
      error: false,
      errorText: "Something wrong!",
    };
    this.maxSelectedUri = 5;
    this.selectedUri = [];
    this.startDate = "";
    this.endDate = "";
    this.receivedData = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.receivedData === false) {
      if (nextProps.data) {
        let uriList = getUriList(nextProps.data);
        let num = uriList.length;
        let visible = [];
        for (let i = 0; i < num; ++i) visible.push(true);
        this.setState({
          uriList: uriList.sort(),
          uriListVisible: visible,
        });
        this.receivedData = true;
      }
    }
  }

  // record checked checkbox value.
  handleCheckBox = (event) => {
    if (event.target.id) {
      let id = event.target.id;
      let uripart = id.split("::");
      let uri = uripart[1];
      if (uri && uri !== "") {
        if (event.target.checked === true) {
          // allow maximum of 5 uris selected.
          if (this.selectedUri.length >= this.maxSelectedUri) {
            event.target.checked = false;
            this.setState({
              error: true,
              errorText: "Only maximum of 5 URIs allowed",
            });
          } else {
            this.selectedUri.push(uri);
          }
        } else {
          let index = this.selectedUri.indexOf(uri);
          if (index > -1) {
            this.selectedUri.splice(index, 1);
          }
        }
      }
    }
  };

  // handle uri filter in the uri dropdown.
  handleFilter = (event) => {
    let value = event.target.value.toLowerCase();
    let visible = this.state.uriListVisible;
    for (let i = 0; i < this.state.uriList.length; ++i) {
      if (this.state.uriList[i].toLowerCase().indexOf(value) > -1) {
        visible[i] = true;
      } else {
        visible[i] = false;
      }
    }
    this.setState({ uriListVisible: visible });
  };

  // set date onchange
  setDate = (e) => {
    if (e.target.id === "start-date") {
      this.startDate = e.target.value;
    } else {
      this.endDate = e.target.value;
    }
  };

  // apply and process custom filters and send result to the line chart.
  handleApply = () => {
    console.log(this.selectedUri);
    console.log(this.startDate);
    console.log(this.endDate);
    if (
      this.endDate === "" ||
      this.startDate === "" ||
      this.selectedUri.length === 0
    ) {
      this.setState({
        error: true,
        errorText: "Some information is empty.",
      });
      return null;
    }
    if (this.endDate < this.startDate) {
      this.setState({
        error: true,
        errorText: "Error! End date is greater than start date!",
      });
      return null;
    }
    this.setState({ applyLoading: true });
    setTimeout(() => {
      if (this.props.data) {
        let result = getDataFromTimeRange(
          this.startDate,
          this.endDate,
          this.selectedUri,
          this.props.data
        );
        this.props.lineHandler(result);
        this.setState({ error: false });
      } else {
        this.setState({
          error: true,
          errorText: "Internal Error! Database Not Connected!",
        });
      }
      this.setState({ applyLoading: false });
    }, 600);
  };

  handleAlert = () => {
    this.setState({ error: false });
  };

  render() {
    const content = [];
    for (let i = 0; i < this.state.uriList.length; ++i) {
      let uri = this.state.uriList[i];
      content.push(
        <div key={uri}>
          <Form.Check
            onChange={this.handleCheckBox}
            type={"checkbox"}
            id={`uri::${uri}`}
            label={`${uri}`}
          />
        </div>
      );
    }
    return (
      <div>
        <Row>
          <Col sm={12} md={6} lg={3}>
            <label htmlFor="start-date">Start Date:</label>
            <Form.Control
              type="date"
              id="start-date"
              onChange={this.setDate}
              disabled={this.state.applyLoading ? true : false}
            />
          </Col>
          <Col sm={12} md={6} lg={3}>
            <label htmlFor="end-date">End Date:</label>
            <Form.Control
              type="date"
              id="end-date"
              onChange={this.setDate}
              disabled={this.state.applyLoading ? true : false}
            />
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <label htmlFor="stat-dropdown" className="{style.optionLabel}">
              Select Uri:
            </label>
            <Dropdown>
              <Dropdown.Toggle
                variant="success"
                id="stat-dropdown"
                disabled={this.state.applyLoading ? true : false}
                className="bg-light text-dark"
              >
                Select URI
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100">
                <div>
                  <Form.Control
                    type="text"
                    placeholder="Filter uri ..."
                    onChange={this.handleFilter}
                  />
                </div>

                <Dropdown.Divider />

                {content}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col xs={12} sm={6} lg={3}>
            <label htmlFor="apply">Apply Change:</label>
            <Button
              variant="info"
              id="apply"
              className="bg-info text-white"
              onClick={this.handleApply}
              disabled={this.state.applyLoading ? true : false}
            >
              {this.state.applyLoading ? (
                <Spinner animation="grow" size="sm" />
              ) : (
                "Apply"
              )}
            </Button>
          </Col>
        </Row>

        {this.state.error && (
          <Alert variant="danger" onClose={this.handleAlert} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            <p>{this.state.errorText}</p>
          </Alert>
        )}
      </div>
    );
  }
}

// get a list of different uris from data that fetched from the database.
function getUriList(data) {
  let uriList = [];
  if (data) {
    data.forEach((row) => {
      let uri = row.uri;
      // uriList acts as set.
      if (
        uriList.indexOf(uri) === -1 &&
        uriList.length < 8 &&
        row.uri.length < 10
      ) {
        uriList.push(uri);
      }
    });
    console.log(uriList);
  }
  return uriList;
}

// get total request number on each day for each requested uri from the given time range.
function getDataFromTimeRange(start, end, requestedUri, data) {
  if (!data) {
    return null;
  }
  let startDateStr = start.toString().split("-").join(".");
  let startDate = new Date(startDateStr);
  let unixStart = startDate.getTime();
  let endDateStr = end.toString().split("-").join(".");
  let endDate = new Date(endDateStr);
  endDate.setDate(endDate.getDate() + 1);
  let unixEnd = endDate.getTime();
  let numDays = 0;

  let result = {};
  result.data = [];
  result.labels = [];
  result.unixTimeLabels = [];

  let current = new Date(startDateStr);
  while (current <= endDate) {
    ++numDays;
    let label = `${current.getMonth() + 1}-${current.getDate()}`;
    result.labels.push(label);
    result.unixTimeLabels.push(current.getTime());
    current.setDate(current.getDate() + 1);
  }
  numDays -= 1;
  // console.log('num day == ' + numDays);

  let zeros = [];
  for (let i = 0; i < numDays; ++i) zeros.push(0);

  requestedUri.forEach((uri) => {
    result.data.push({
      name: uri,
      traffic: [...zeros],
    });
  });

  let unixTimeRange = result.unixTimeLabels;

  for (let i = 0; i < data.length; ++i) {
    let unixTime = data[i].utime * 1000;
    if (unixTime < unixStart || unixTime >= unixEnd) {
      // out of range, skip to next data row.
      continue;
    }

    let uri = data[i].uri;
    // console.log('on i = ' +  i + '  ' + uri);
    for (let j = 0; j < numDays; ++j) {
      let current = unixTimeRange[j];
      let next = unixTimeRange[j + 1];
      // console.log(`${current} ${unixTime} ${next}`);
      if (unixTime >= current && unixTime < next) {
        // console.log('match time');
        for (let k = 0; k < requestedUri.length; ++k) {
          if (uri === requestedUri[k]) {
            result.data[k].traffic[j] += 1;
            break;
          }
        }
        break;
      }
    }
  }
  result.labels.pop();
  result.unixTimeLabels.pop();
  console.log(result);
  return result;
}

export default TrafficStatistic;
