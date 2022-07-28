import React from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import Chart from "react-apexcharts";

const OrderStatus = () => {
  const optionsorder = {
    chart: {
      id: "donut-chart",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60px",
        },
      },
    },
    labels: ["Success", "Failed ", "Pending"],
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    colors: ["rgb(64, 196, 255)", "rgb(255, 130, 28)", "rgb(41, 97, 255)"],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriesorder = [65, 15, 17];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card className="order-widget">
      <CardBody>
        <Row>
          <Col sm="12" md="8">
            <CardTitle>Order Status</CardTitle>
            <CardSubtitle className="mb-0">
              Total Earnings of the Month
            </CardSubtitle>
            <Row className="mt-3">
              <Col xs="4" className="border-right">
                <i className="fa fa-circle text-cyan"></i>
                <h3 className="mb-0 font-medium">5489</h3>
                <span>Success</span>
              </Col>
              <Col xs="4" className="border-right">
                <i className="fa fa-circle text-orange"></i>
                <h3 className="mb-0 font-medium">954</h3>
                <span>Pending</span>
              </Col>
              <Col xs="4">
                <i className="fa fa-circle text-info"></i>
                <h3 className="mb-0 font-medium">736</h3>
                <span>Failed</span>
              </Col>
            </Row>
          </Col>
          <Col sm="12" md="4">
            <div id="visitor" className="mt-3">
              <Chart
                options={optionsorder}
                series={seriesorder}
                type="donut"
                height="110"
              />
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default OrderStatus;
