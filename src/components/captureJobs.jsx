import React, { Component } from "react";
import {
  Input,
  FormGroup,
  Row,
  Col,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import Axios from "axios";
import Joi from "joi-browser";
import DatePicker from "./datePicker";
import "./newCaptureJob.css";

class Capture extends Component {
  state = {
    capture: {
      jobName: "",
      uri: "",
      secure: "",
      on: "",
      off: "",
      http: "",
      https: "",
      protocol: "",
      host: "",
      get: "",
      post: "",
      put: "",
      method: [],
      sourceIP: "",
    },
    errors: {},
    startDate: new Date(),
    endDate: new Date(),
  };

//input validation
  schema = {
    jobName: Joi.string().required().label("Job Name"),
    uri: Joi.string().optional().allow("").label("URI"),
    protocol: Joi.string().optional().allow("").label("Protocol"),
    host: Joi.string().optional().allow("").label("Host"),
    method: Joi.string().optional().allow("").label("Method"),
    secure: Joi.string().optional().allow("").label("Secure"),
    sourceIP: Joi.string().optional().allow("").label("Source IP"),
    startDate: Joi.number().required().label("Start Date"),
    on: Joi.string().required().label("ON"),
    off: Joi.string().required().label("OFF"),
    http: Joi.string().required().label("HTTP"),
    https: Joi.string().required().label("HTTPS"),
    get: Joi.string().required().label("GET"),
    put: Joi.string().required().label("PUT"),
    post: Joi.string().required().label("POST"),
    // startTime: Joi.number().label("Start Time"),
    // endDate: Joi.number().label("End Date"),
    // endTime: Joi.number().label("End Time"),
    // Message: Joi.string().label("Message"),
  };

//validate input
  validate = () => {
    const result = Joi.validate(this.state.capture, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (error) return error.details[0].message;
    return null;
  };

//handle submit
  handleSubmit = (e) => {
    e.preventDefault();

    //const errors = this.validate();
    //this.setState({ errors: errors || {} });
    //if (errors) return;
    //Call the server
    this.submit();
  };

//Get data
  async submit() {
    console.log(this.state);
    const {
      data: message,
    } = await Axios.post(
      "http://ec2-54-152-230-158.compute-1.amazonaws.com:7999/api/capture",
      { jobName: "Ananda", startTime: 2000, endTime: 2400 }
    );
    this.setState({ message });
    console.log(message);
  }

//Suppose to output error for each input
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const capture = { ...this.state.capture };

    capture[input.name] = input.value;
    this.setState({ capture, errors });
  };

//get input select value
  onSelect = ({ currentTarget: input }) => {
    const capture = { ...this.state.capture };
    capture[input.name] = input.value;
    this.setState({ capture });
  };

//start date input
  handleStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };
//save end date
  handleEndDate = (date) => {
    this.setState({
      endDate: date,
    });
  };

  render() {
    return (
      <>
        <form
          className="form bg-light text-secondary border rounded"
          onSubmit={this.handleSubmit}
        >
          <Row className="m-1 mt-3 pb-2">
            <Col md={6}>
              <FormGroup>
                <label>Capture Job Name</label>
                <Input
                  name="jobName"
                  value={this.state.capture.jobName}
                  onChange={this.handleChange}
                  invalid={this.state.errors.jobName}
                />
                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <label>URI</label>
                <Input
                  className="captureForm"
                  value={this.state.capture.uri}
                  onChange={this.handleChange}
                  name="uri"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="m-1 pb-2">
            <Col md={6}>
              <FormGroup>
                <label>Host</label>
                <Input
                  className="captureForm"
                  value={this.state.capture.host}
                  onChange={this.handleChange}
                  name="host"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <label>Source IP</label>
                <Input
                  className="captureForm"
                  value={this.state.capture.sourceIP}
                  onChange={this.handleChange}
                  name="sourceIP"
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="ml-5">
            <Col md={6}>
              <FormGroup>
                <label>Start Date and Time</label>
                <DatePicker
                  selected={this.state.startDate}
                  value={this.state.startDate}
                  onChange={this.handleStartDate}
                  onSelect={this.handleSelect}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <label>End Date and Time</label>
                <DatePicker
                  selected={this.state.endDate}
                  value={this.state.capture.endDate}
                  onChange={this.handleEndDate}
                  onSelect={this.handleSelect}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="m-1 pb-2">
            <Col md={4}>
              <FormGroup className="text-center">
                <div className="pb-2">Method</div>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      className="captureForm"
                      type="checkbox"
                      onChange={this.handleChange}
                      name="get"
                      value="on"
                    />{" "}
                    GET
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      className="captureForm"
                      type="checkbox"
                      onChange={this.handleChange}
                      name="post"
                      value="on"
                    />{" "}
                    POST
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      className="captureForm"
                      type="checkbox"
                      onChange={this.handleChange}
                      name="put"
                      value="on"
                    />{" "}
                    PUT
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup className="text-center">
                <div className="pb-2">Protocol</div>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      name="http"
                      value="on"
                    />{" "}
                    HTTP
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      onChange={this.handleChange}
                      type="checkbox"
                      onChange={this.handleChange}
                      name="https"
                      value="on"
                    />{" "}
                    HTTPS
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup className="text-center">
                <div className="pb-2">Secure</div>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      className="captureForm"
                      type="checkbox"
                      onChange={this.handleChange}
                      name="on"
                      value="on"
                    />{" "}
                    Yes
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={this.handleChange}
                      name="off"
                      value="on"
                    />{" "}
                    No
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
          <div className="text-center">
            <Button className="bg-success px-5 text-center">Submit</Button>
          </div>
          <br />
          <br />
        </form>
      </>
    );
  }
}

export default Capture;
