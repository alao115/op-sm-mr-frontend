import React from "react";

import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import Chart from "react-apexcharts";

const Products = () => {
  const optionproducts = {
    chart: {
      id: "basic-bar",
      type: "line",
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    labels: ["Day", "Month"],
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
      borderColor: "rgba(0,0,0,0.1)",
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
      },
      theme: "dark",
    },
    legend: {
      show: false,
    },
    colors: ["#2962FF", "#4fc3f7"],
    plotOptions: {
      bar: {
        columnWidth: "25%",
      },
    },
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      categories: [
        0,
        2,
        4,
        6,
        8,
        10,
        12,
        14,
        16,
        18,
        20,
        22,
        24,
        26,
        28,
        30,
        32,
      ],
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
            "#99abb4",
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
  };
  const seriesproducts = [
    {
      name: "Site A",
      type: "column",
      data: [5, 6, 3, 7, 9, 10, 14, 12, 11, 9, 8, 7, 10, 6, 12, 10, 8],
    },
    {
      name: "Site B",
      type: "column",
      data: [1, 2, 8, 3, 4, 5, 7, 6, 5, 6, 4, 3, 3, 12, 5, 6, 3],
    },
  ];
  return (
    /*--------------------------------------------------------------------------------*/
    /* Used In Dashboard-3 [Ecommerce]                                                */
    /*--------------------------------------------------------------------------------*/
    <Card>
      <CardBody>
        <div className="d-md-flex align-items-center">
          <div>
            <CardTitle>Product Sales</CardTitle>
            <CardSubtitle>Total Earnings of the Month</CardSubtitle>
          </div>
        </div>
        <div className="product-sales">
          <Chart
            options={optionproducts}
            series={seriesproducts}
            type="line"
            height="400"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Products;
