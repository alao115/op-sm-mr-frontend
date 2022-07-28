import React from "react";

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import Chart from "react-apexcharts";

// revenue chart
const optionsrevenue = {
  chart: {
    id: "basic-bar",
    type: "bar",
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ["#fff"],
  plotOptions: {
    bar: {
      horizontal: false,
      endingShape: "flat",
      columnWidth: "30%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
  },
  fill: {
    opacity: 1,
  },

  tooltip: {
    theme: "dark",
  },
};
const seriesrevenue = [
  {
    name: "Net Profit",
    data: [6, 10, 9, 11, 9, 10, 12],
  },
];

// page views chart
const optionspageviews = {
  chart: {
    id: "basic-bar",
    type: "area",
    toolbar: {
      show: false,
    },
    sparkline: { enabled: true },
  },
  colors: ["#fff"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
    width: 1,
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },

  tooltip: {
    theme: "dark",
  },
};
const seriespageviews = [
  {
    name: "Views",
    data: [28, 40, 36, 52, 38, 60, 55],
  },
];

// bounce chart
const optionsbounce = {
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  colors: ["#2962FF"],
  chart: {
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: "solid",
    opacity: 0,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  markers: {
    size: 3,
  },
  xaxis: {
    type: "numeric",
    lines: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: { show: false },
  },
  yaxis: [
    {
      y: 0,
      offsetX: 0,
      offsetY: 0,
      padding: { left: 0, right: 0 },
    },
  ],
  tooltip: {
    x: { show: false },
    theme: "dark",
  },
};
const seriesbounce = [
  {
    name: "Rate",
    data: [59, 65, 45, 50, 42, 40],
  },
];

const Stats = () => {
  return (
    <Row>
      <Col lg="4">
        <Card className="bg-info text-white">
          <CardBody>
            <CardTitle>Revenue Statistics</CardTitle>
            <div className="d-flex align-items-center mt-4 pt-2">
              <div>
                <Chart
                  options={optionsrevenue}
                  series={seriesrevenue}
                  type="bar"
                  height="103"
                  width="120"
                />
              </div>
              <div className="ml-auto">
                <h2 className="text-white mb-0">
                  <i className="ti-arrow-up"></i>$351
                </h2>
                <span className="text-white op-5">Jan 10 - Jan 20</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col lg="4">
        <Card className="bg-cyan">
          <CardBody>
            <div className="d-flex align-items-center">
              <div>
                <CardTitle className="text-white">Page Views</CardTitle>
                <h2 className="text-white mb-0">
                  <i className="ti-arrow-up"></i> 6548
                </h2>
              </div>
              <div className="ml-auto">
                <ListGroup className="mb-0">
                  <ListGroupItem className="text-white bg-transparent p-0 border-0">
                    <i className="fa fa-circle mr-1 text-white font-12 op-3"></i>{" "}
                    Visit
                  </ListGroupItem>
                  <ListGroupItem className="text-white bg-transparent p-0 border-0">
                    <i className="fa fa-circle mr-1 text-white text-accent-4 font-12"></i>{" "}
                    Page Views
                  </ListGroupItem>
                </ListGroup>
              </div>
            </div>
          </CardBody>
          <div id="views">
            <Chart
              options={optionspageviews}
              series={seriespageviews}
              type="line"
              height="90"
            />
          </div>
        </Card>
      </Col>
      <Col lg="4">
        <Card>
          <CardBody>
            <h2 className="m-b-0">56.33%</h2>
            <span className="">Bounce Rate</span>
            <div className="d-flex align-items-center mb-3 pb-2">
              <div className="dl">
                <Input type="select" className="custom-select">
                  <option value="0">Monthly</option>
                  <option value="1">Daily</option>
                  <option value="2">Weekly</option>
                  <option value="3">Yearly</option>
                </Input>
              </div>
              <div className="ml-auto">
                <div
                  className="chart-wrapper mb-3"
                  style={{ maxWidth: "150px", height: "55px" }}
                >
                  <Chart
                    options={optionsbounce}
                    series={seriesbounce}
                    type="area"
                    height="110"
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Stats;
