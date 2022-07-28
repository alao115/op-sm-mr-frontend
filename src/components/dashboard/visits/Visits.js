import React from "react";

import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import Chart from "react-apexcharts";

const Visits = () => {
  const optionsvisits = {
    chart: {
      id: "total-visits",
      type: "bar",
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    colors: ["#4dd0e1"],
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
      width: 4,
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
      enabled: true,
      theme: "dark",
    },
  };
  const seriesvisits = [
    {
      name: "Total Visits",
      data: [6, 15, 9, 11, 9, 15, 20, 15, 9, 11, 9, 15],
    },
  ];
  return (
    <Card>
      <CardBody>
        <CardTitle>Total Visits</CardTitle>
        <h4 className="font-bold mt-3 mb-2">3,25,346</h4>
        <CardSubtitle className="mb-0">
          Total Earnings of the Month
        </CardSubtitle>
      </CardBody>
      <div className="text-center">
        <Chart
          options={optionsvisits}
          series={seriesvisits}
          type="bar"
          height="62"
        />
        {/* <Bar
                    data={barData}
                    width={100}
                    height={62}
                    options={barOptions} /> */}
      </div>
    </Card>
  );
};

export default Visits;
