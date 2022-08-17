import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  // CustomInput,
  Input,
  Spinner,
  Button
} from "reactstrap";
// import Spinner from '../../../views/spinner/Spinner';
import * as S from "../";
import Chart from "react-apexcharts";
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'

//Line chart


const SalesSummary = () => {
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()
  const [reportOverviewLoading, setReportOverviewLoading] = useState(false)
  const [reportOverviewByAtda, setReportOverviewByAtda] = useState([])
  const [atda, setAtda] = useState("")
  const [valType, setValType] = useState(false)
  const [previousMonth, setPreviousMonth] = useState(false)
  const [tractorOverview, setTractorOverview] = useState([])
  const [tractorOverviewLoading, setTractorOverviewLoading] = useState(false)

  useEffect(() => {
    setReportOverviewLoading(true)
    $api.overviewService.getReportOverviewByAtda(atda, valType, previousMonth)
        .then(({ data }) => {
          // console.log(data)
          setReportOverviewLoading(false)
          setReportOverviewByAtda(data)
        }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Tracteur par Atda', message }), { appearance: 'error', autoDismiss: true })
      })
  }, [$api.overviewService, $message, addToast, atda, previousMonth, valType])

  useEffect(() => {
    setTractorOverviewLoading(true)
    $api.overviewService.getTractorOverview()
        .then(({ data }) => {
          // console.log(data)
          setTractorOverviewLoading(false)
          setTractorOverview(data)
        }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Tracteur par Atda', message }), { appearance: 'error', autoDismiss: true })
      })
  }, [$api.overviewService, $message, addToast])

  const optionssalesummary = {
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
    colors: ["rgb(224, 36, 55)", "rgb(44, 177, 153)", "rgb(41, 161, 217)"],
    legend: {
      show: true,
    },
    markers: {
      size: 3,
    },
    xaxis: {
      categories: reportOverviewByAtda.map(item => moment.unix(item._id).format("DD-MM-YYYY").split('-')[0]), //[1, 2, 3, 4, 5, 6, 7, 8, 9],
      labels: {
        show: true,
        style: {
          colors: "#99abb4",
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
  
  const seriessalessummry = [
    {
      name: "Vitesse",
      data: reportOverviewByAtda.map(item => item.vitesse),
    },
    {
      name: "Distance",
      data: reportOverviewByAtda.map(item => item.distance),
    },
    {
      name: "Heure moteur",
      data: reportOverviewByAtda.map(item => item.hmoteur) // [4, 6, 5, 7, 3, 9, 1, 4],
    },
  ];

  return (
    <Card>
      <CardBody>
        <div className="d-md-flex align-items-center">
          <div>
            <CardTitle>Apercu General</CardTitle>
            <CardSubtitle>Apercu du mois courant</CardSubtitle>
          </div>
          <div className="ml-auto d-flex no-block align-items-center">
            <ul className="list-inline font-12 dl mr-3 mb-0">
              <li className="border-0 p-0 text-info list-inline-item">
                 <Button className="btn" color="primary" size="sm" onClick={ () => setValType(false) }> Val. Maximale </Button>
              </li>
              <li className="border-0 p-0 text-primary list-inline-item">
                <Button className="btn" color="secondary" size="sm" onClick={ () => setValType(true) }> Val. Moyenne </Button>
              </li>
            </ul>
            <div className="dl">
              <Input type="select" id="exampleCustomSelect" onChange={(event) => setAtda(event.target.value) }>
                <option value="">Choississez un atda</option>
                {
                  [1, 2, 3, 4, 5, 6, 7].map(atda => <option key={atda} value={atda}>{`atda-${atda}`}</option> )
                }
              </Input>
            </div>
          </div>
        </div>
        <Row>
          <Col lg="4">
            {
              tractorOverviewLoading ?
              <div className="d-flex justify-content-center h-100 align-items-center">
                <Spinner className="ml-2" size="lg" color="primary" style={{width: '6rem', height: '6rem'}}></Spinner>
              </div> :
              <>
                <h1 className="mb-0 mt-4">699</h1>
                <h6 className="font-light text-muted">Nombre de trateur total</h6>
                <h3 className="mt-4 mb-0">{ tractorOverview.tractorTotal }</h3>
                <h6 className="font-light text-muted">Tracteurs traces</h6>
                <div className="flex space-x-4">
                  <button className="btn btn-info p-3 px-4" onClick={ () => setPreviousMonth(true) }> Apercu mois précédent </button>
                  <button className="btn btn-secondary p-3 px-4 " onClick={ () => setPreviousMonth(false) }> Apercu mois actuel </button>
                </div>
              </>
            }    
          </Col>
          <Col lg="8">
            <div className="campaign ct-charts">
              <div
                className="chart-wrapper"
                style={{ width: "100%", margin: "0 auto", height: 250 }}
              >
                {
                  reportOverviewLoading ?
                  <div className="d-flex justify-content-center h-100 align-items-center">
                    <Spinner className="ml-2" size="lg" color="primary" style={{width: '6rem', height: '6rem'}}></Spinner>
                  </div> :
                  <Chart
                    options={optionssalesummary}
                    series={seriessalessummry}
                    type="area"
                    height="250"
                  />
                }
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
      <CardBody className="border-top">
        <Row className="mb-0">
          <Col lg="3" md="6">
            <S.Statistics
              textColor="orange"
              icon="wallet"
              title="Wallet Balance"
              subtitle="3,567.53"
            />
          </Col>
          <Col lg="3" md="6">
            <S.Statistics
              textColor="cyan"
              icon="star-circle"
              title="ATDA"
              subtitle="7"
            />
          </Col>
          <Col lg="3" md="6">
            <S.Statistics
              textColor="info"
              icon="shopping"
              title="Points de vent"
              subtitle="37"
            />
          </Col>
          <Col lg="3" md="6">
            <S.Statistics
              textColor="primary"
              icon="currency-usd"
              title="Earnings"
              subtitle="23,568.90"
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default SalesSummary;
