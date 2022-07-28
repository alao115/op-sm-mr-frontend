import React from "react";

import { Card, CardBody, CardTitle } from "reactstrap";

import Chart from "react-apexcharts";

const SalesRatio = () => {
  const optionssalesratio = {
    chart: {
      id: "sales-ratio",
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
    colors: ["#2962FF"],
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    markers: {
      size: 0,
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
  const seriessalesratio = [
    {
      name: "Sales Ratio",
      data: [5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
    },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-4 [General]                                                  */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody>
        <CardTitle>Sales Ratio</CardTitle>
        <h4 className="font-bold mt-3 mb-2">35,658</h4>
        <h5 className="card-subtitle mb-0">Total Earnings of the Month</h5>
      </CardBody>
      <div className="earningsbox">
        <Chart
          options={optionssalesratio}
          series={seriessalesratio}
          type="area"
          height="60"
        />
      </div>
    </Card>
  );
};

export default SalesRatio;
