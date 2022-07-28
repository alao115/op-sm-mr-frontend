import React from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import Chart from "react-apexcharts";

const Orders = () => {
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
          size: "70px",
          labels: {
            show: true,

            total: {
              show: true,
              label: "Orders",
              color: "#99abb4",
            },
          },
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
    /* Used In Dashboard-3 [Ecommerce]                                                */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody className="border-bottom">
        <CardTitle>Order Stats</CardTitle>
        <CardSubtitle>Overview of orders</CardSubtitle>
        <div className="status mt-4">
          <Chart
            options={optionsorder}
            series={seriesorder}
            type="donut"
            height="250"
          />
        </div>
      </CardBody>
      <CardBody>
        <Row>
          <Col className="xs-4">
            <i className="fa fa-circle text-primary"></i>
            <h3 className="mb-0 font-medium">5489</h3>
            <span>Success</span>
          </Col>
          <Col className="xs-4">
            <i className="fa fa-circle text-info"></i>
            <h3 className="mb-0 font-medium">954</h3>
            <span>Pending</span>
          </Col>
          <Col className="xs-4">
            <i className="fa fa-circle text-orange"></i>
            <h3 className="mb-0 font-medium">736</h3>
            <span>Failed</span>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Orders;
