import React from "react";
import { Component } from "react";
import { Card, Input, DatePicker, Radio, Button, message, Spin } from "antd";
import PropTypes from "prop-types";
import axios from "axios";

function _Field() {
  this.value = "";
  this.isValidated = false;
}

class SignUp extends Component {
  constructor(props) {
    super(props);

    let name = new _Field();
    let email = new _Field();
    let username = new _Field();
    let password = new _Field();
    let birthday = new _Field();
    let sex = "male";

    this.state = {
      name,
      email,
      username,
      sex,
      birthday,
      password,
      loading: false
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.areAllValidated = this.areAllValidated.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  fieldValidator = {
    // only word characters and whitespaces
    name: /^[A-Z\sa-z]+$/,

    email: /^[\w._]{0,64}@[a-zA-Z]{1,10}\.[a-zA-Z]{1,10}$/,

    // word and digits characters including underscore and period
    username: /^[\w._]{6,12}$/,

    // All characters including special characters
    password: /^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/
  };

  handleFieldChange(fieldName, event) {
    let pattern = this.fieldValidator[fieldName];
    let field = this.state[fieldName];

    const val = event.target.value;

    if (pattern.test(val)) field.isValidated = true;
    else field.isValidated = false;

    field.value = val;

    this.setState({ field: field });
  }

  handleDateChange(dateObj, dateString) {
    let dob = new Date(dateString);
    let now = new Date();

    let birthday = this.state.birthday;
    birthday.isValidated = now < dob || !dateString ? false : true;

    birthday.value = dateString;
    this.setState({ birthday });
  }

  areAllValidated() {
    for (let field in this.state) {
      if (field === "sex" || field === "loading") continue;
      if (!this.state[field].isValidated) return false;
    }
    return true;
  }

  onSubmit() {
    let formData = {};

    for (let field in this.state) {
      if (field === "sex") formData[field] = this.state[field];
      else formData[field] = this.state[field].value;
    }
    formData.location = this.props.location;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: "/api/user/register",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        this.setState({ loading: false });
        message.success("Successfully signed up");
      })
      .catch(err => {
        this.setState({ loading: false });
        if (err.response.status === 401) {
          message.error("Sorry this username is already taken");
        } else {
          message.error("Could not connect. Please try again");
        }
      });
  }

  render() {
    return (
      <Spin spinning={this.state.loading}>
        <Card
          bodyStyle={{ color: "rgb(0,0,0)" }}
          bordered={false}
          style={this.props.style}
        >
          <h1 style={{ fontFamily: "Arial", fontSize: "40px" }}>Sign Up</h1>

          <Input
            id="name"
            value={this.state.name.value}
            style={{
              width: "80%",
              marginBottom: "5%",
              borderColor:
                !this.state.name.isValidated && this.state.name.value
                  ? "red"
                  : ""
            }}
            onChange={e => {
              this.handleFieldChange("name", e);
            }}
            size="large"
            placeholder="John Doe"
          />

          <Input
            id="email"
            value={this.state.email.value}
            style={{
              width: "80%",
              marginBottom: "5%",
              borderColor:
                !this.state.email.isValidated && this.state.email.value
                  ? "red"
                  : ""
            }}
            placeholder="johndoe123@gmail.com"
            onChange={e => {
              this.handleFieldChange("email", e);
            }}
            size="large"
          />

          <DatePicker
            placeholder="Birthday"
            size="large"
            showToday={false}
            onChange={this.handleDateChange}
            format="YYYY-MM-DD"
            style={{
              borderColor:
                !this.state.birthday.isValidated && this.state.birthday.value
                  ? "red"
                  : "",
              display: "inline-block",
              width: "40%",
              marginBottom: "5%"
            }}
          />

          <Radio.Group
            value={this.state.sex}
            onChange={e => {
              this.setState({ sex: e.target.value });
            }}
            style={{
              display: "inline-block",
              width: "40%",
              marginBottom: "7.5%"
            }}
          >
            <Radio size="large" value="male">
              Male
            </Radio>
            <Radio size="large" value="female">
              Female
            </Radio>
          </Radio.Group>

          <Input
            id="Username"
            value={this.state.username.value}
            style={{
              display: "inline-block",
              width: "38.5%",
              marginRight: "3%",
              marginBottom: "5%",
              borderColor:
                !this.state.username.isValidated && this.state.username.value
                  ? "red"
                  : ""
            }}
            size="large"
            onChange={e => {
              this.handleFieldChange("username", e);
            }}
            placeholder="Username"
          />

          <Input.Password
            id="Password"
            value={this.state.password.value}
            style={{
              display: "inline-block",
              width: "38.5%",
              marginBottom: "5%"
            }}
            size="large"
            placeholder="Password"
            onChange={e => {
              this.handleFieldChange("password", e);
            }}
          />
          <br />
          <Button
            disabled={!this.areAllValidated()}
            size="large"
            shape="round"
            style={{ width: "80%", marginBottom: "5%" }}
            onClick={this.onSubmit}
          >
            <span style={{ fontSize: "1.25vw" }}>Sign Up</span>
          </Button>
        </Card>
      </Spin>
    );
  }
}

SignUp.protoTypes = {
  style: PropTypes.object
};

export default SignUp;
