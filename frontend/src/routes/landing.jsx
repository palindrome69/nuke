import { Component } from "react";
import React from "react";
import { Card, Col, Row } from "antd";

import Loadable from "react-loadable";

const LoadLogin = Loadable({
  loader: () => import("../components/login"),
  loading: () => <div>Loading..</div>
});

const LoadSignup = Loadable({
  loader: () => import("../components/signup"),
  loading: () => <div>Loading..</div>
});

class LandingPage extends Component {
  render() {
    return (
      <Card
        style={{
          textAlign: "center",
          marginTop: "5%",
          marginLeft: "10%",
          marginRight: "10%",
          height: ""
        }}
        bordered={true}
      >
        <Row gutter={0}>
          <Col span={12}>
            <LoadLogin
              style={{
                marginTop: "5%",
                textAlign: "center",
                marginRight: "0.75%",
                marginBottom: "5%"
              }}
            />
          </Col>
          <Col span={12}>
            <LoadSignup
              style={{
                marginTop: "5%",
                textAlign: "center",
                marginLeft: "0.75%"
              }}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default LandingPage;