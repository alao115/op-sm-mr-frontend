import React from "react";
import { Card, CardBody } from "reactstrap";

import Chart from "react-apexcharts";

const CampaignOverview = () => {
  const optionscampaignoverview = {
    chart: {
      id: "earnings",
      type: "area",
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#2962FF", "#4fc3f7"],
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    markers: {
      size: 3,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
      theme: "dark",
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
  };
  const seriescampaignoverview = [
    {
      name: "Last Month",
      data: [3, 8, 2, 3, 2, 5, 6, 8],
    },
    {
      name: "Current Month",
      data: [7, 6, 5, 8, 6, 7, 2, 1],
    },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody>
        <div className="d-flex align-items-center mb-3">
          <div>
            <h1 className="font-bold mb-0">$6,890.68</h1>
            <span>Overview of email campaigns</span>
          </div>
          <div className="ml-auto">
            <i className="mdi mdi-wallet text-info display-5"></i>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
          pharetra ligula, sit amet laoreet arcu.Integer.
        </p>
        <a href="/" className="font-bold">
          Last Month Summary
        </a>
      </CardBody>
      <div className="mt-5">
        <div className="chart-wrapper" style={{ height: "160px" }}>
          <Chart
            options={optionscampaignoverview}
            series={seriescampaignoverview}
            type="area"
            height="160"
          />
        </div>
      </div>
    </Card>
  );
};

export default CampaignOverview;
