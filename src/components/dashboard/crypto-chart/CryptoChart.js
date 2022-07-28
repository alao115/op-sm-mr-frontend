import React from "react";

import Chart from "react-apexcharts";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";

const CryptoChart = () => {
  //Line chart
  const optionscryptocharts = {
    chart: {
      id: "basic-bar",
      type: "area",
      toolbar: {
        show: false,
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "solid",
      opacity: [0.1, 0.2, 0.9],
    },
    colors: ["#1240c2", "#40c4ff", "#edf3f7"],
    legend: {
      show: false,
    },
    markers: {
      size: 3,
    },
    xaxis: {
      categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
      labels: {
        show: true,
        style: {
          colors: [
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
          ],
          fontSize: "12px",
          fontFamily: "'Nunito Sans', sans-serif",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: [
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
            "#99abb4",
          ],
          fontSize: "12px",
          fontFamily: "'Nunito Sans', sans-serif",
        },
      },
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriescryptocharts = [
    {
      name: "Site A view",
      data: [0, 80, 40, 100, 30, 150, 80, 300, 250],
    },
    {
      name: "Site B view",
      data: [0, 35, 30, 60, 20, 80, 50, 180, 150],
    },
    {
      name: "Site C view",
      data: [0, 15, 15, 38, 8, 40, 20, 100, 70],
    },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-2 [Cryptocurrency]                                           */
    /*--------------------------------------------------------------------------------*/
    <Row>
      <Col xs="12">
        <Card>
          <CardBody>
            <div className="d-md-flex align-items-center">
              <div>
                <CardTitle>BitCoin / Ethereum / Ripple</CardTitle>
                <CardSubtitle>Overview of Latest Month</CardSubtitle>
              </div>
              <div className="ml-auto d-flex align-items-center">
                <div className="dl">
                  <FormGroup>
                    <Input type="select" className="custom-select">
                      <option value="0">Monthly</option>
                      <option value="1">Daily</option>
                      <option value="2">Weekly</option>
                      <option value="3">Yearly</option>
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Chart
                options={optionscryptocharts}
                series={seriescryptocharts}
                type="area"
                height="350"
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default CryptoChart;
