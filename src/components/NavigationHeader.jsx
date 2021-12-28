import React from "react";
import { Col, Row } from "react-bootstrap";

const NavigationHeader = ({ customPanelAction, title }) => {
  return (
    <Row className="align-items-center">
      <Col lg={2}>{customPanelAction}</Col>
      <Col lg={8}>
        <h4 className="text-center">{title}</h4>
      </Col>
    </Row>
  );
};

export default NavigationHeader;
