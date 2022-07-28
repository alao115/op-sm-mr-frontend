import React from "react";
import { Row, Col } from "reactstrap";
import {
  SalesSummary,
  EmailCampaign,
  ActiveVisitors,
} from "../../components/dashboard/";


const Classic = () => {
  return (
    <div>
      <Row>
        <Col xs={12}>
          <SalesSummary />
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <EmailCampaign />
        </Col>
        <Col md="4">
          <ActiveVisitors />
        </Col>
      </Row>
    </div>
  );
};

export default Classic;
