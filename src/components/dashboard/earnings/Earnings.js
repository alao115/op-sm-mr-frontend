import React from "react";

import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import Chart from "react-apexcharts";

const Earnings = () => {
  const optionsearnings = {
    chart: {
      id: "basic-bar",
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
    colors: ["#4fc3f7"],
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
  const seriesearnings = [
    {
      name: "Earnings",
      data: [5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
    },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-3 [Ecommerce]                                                */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody>
        <CardTitle>Earnings</CardTitle>
        <CardSubtitle>Total Earnings of the Month</CardSubtitle>
        <h2 className="font-medium">$43,567.53</h2>
      </CardBody>
      <div className="earningsbox mt-1">
        <Chart
          options={optionsearnings}
          series={seriesearnings}
          type="area"
          height="53"
        />
      </div>
    </Card>
  );
};

export default Earnings;
