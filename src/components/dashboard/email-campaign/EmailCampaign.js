import React from "react";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import Chart from "react-apexcharts";
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'

const EmailCampaign = () => {

  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()
  const [tractorByAtdaOverview, setTractorByAtdaOverview] = useState([])

  useEffect(() => {
    $api.overviewService.getAllTractorByAtdaOverview()
        .then(({ data }) => {
          const response = data.data.map(item => ({ atda: item._id, total: item.total }))
          // console.log(response)
          setTractorByAtdaOverview(response)
        }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Tracteur par Atda', message }), { appearance: 'error', autoDismiss: true })
      })
  }, [$api.overviewService, $message, addToast])

  const optionsvisit = {
    chart: {
      id: "donut-chart",
    },
    dataLabels: {
      enabled: true,
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
              label: "ATDA",
              color: "#99abb4",
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: "'Nunito Sans', sans-serif",
      formatter: function(seriesName, opts) {
        return [seriesName.replace('series', 'atda'), ` ${"=".repeat(9)}> `, opts.w.globals.series[opts.seriesIndex]]
      },
      // customLegendItems: tractorByAtdaOverview.map(item => `atda ${item._id}`),
      itemMargin: {
          horizontal: 20,
      },
    },
    colors: [
      "rgb(64, 196, 255)",
      "rgb(255, 130, 28)",
      "rgb(126, 116, 251)",
      "rgb(41, 97, 255)",
      "rgb(10, 17, 90)",
      "rgb(41, 200, 05)",
      "rgb(205, 0, 55)",
    ],
    tooltip: {
      fillSeriesColor: false,
    },
  };
  const seriesvisit = tractorByAtdaOverview.filter(item => item.atda !== 'false').map(x => x.total);
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-1 [Classic]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card className="card-hover">
      <CardBody>
        <div className="d-md-flex align-items-center">
          <div>
            <CardTitle>Tracteur par ATDA</CardTitle>
            <CardSubtitle>Repartition du nombre de tracteurs par ATDA</CardSubtitle>
          </div>
          <div className="ml-auto align-items-center">
            {/* <div className="dl">
              <Input type="select" className="custom-select">
                <option value="0">Monthly</option>
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3">Yearly</option>
              </Input>
            </div> */}
          </div>
        </div>
        <Row className="my-4">
          <Col lg="6">
            <div>
              <Chart
                options={optionsvisit}
                series={seriesvisit}
                type="donut"
                height="245"
              />
            </div>
          </Col>
          {/* <Col lg="6">
            <h1 className="display-6 mb-0 font-medium">45%</h1>
            <span>Open Ratio for Campaigns</span>
            <ListGroup>
              <ListGroupItem className="border-0 mt-3 p-0">
                <i className="fas fa-circle mr-1 text-cyan font-12"></i> Open
                Ratio <span className="float-right">45%</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 mt-3 p-0">
                <i className="fas fa-circle mr-1 text-info font-12"></i> Clicked
                Ratio <span className="float-right">14%</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 mt-3 p-0">
                <i className="fas fa-circle mr-1 text-orange font-12"></i>{" "}
                Un-Open Ratio <span className="float-right">25%</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 mt-3 p-0">
                <i className="fas fa-circle mr-1 text-primary font-12"></i>{" "}
                Bounced Ratio <span className="float-right">17%</span>
              </ListGroupItem>
            </ListGroup>
          </Col> */}
        </Row>
      </CardBody>
    </Card>
  );
};

export default EmailCampaign;
