import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  // CustomInput,
  Input,
  Spinner,
  Button
} from "reactstrap";
// import Spinner from '../../../views/spinner/Spinner';
// import * as S from "../";
import Chart from "react-apexcharts";
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/fr'
import useFetchResource from '../../../hooks/useFetchResource';


//Line chart

const SalesSummary = () => {
  const [reportOverviewLoading, setReportOverviewLoading] = useState(false)
  const [reportOverviewByAtda, setReportOverviewByAtda] = useState([])
  const [atda, setAtda] = useState("")
  const [valType, setValType] = useState(true)
  const [previousMonth, setPreviousMonth] = useState(0)
  const [tractorOverview, setTractorOverview] = useState([])
  const [tractorOverviewLoading, setTractorOverviewLoading] = useState(false)

  const params = useMemo(() => ({ atda, valType, previousMonth }), [atda, valType, previousMonth])
  const { resourceData: overviewByAtda, loadingState: overviewByAtdaLoading } = useFetchResource({ errorHeader: 'Tracteur par Atda', resourceService: 'overviewService', action: 'getReportOverviewByAtda', params })
  const { resourceData: overviewTractor, loadingState: overviewTractorLoading } = useFetchResource({ errorHeader: 'Tracteur par Atda', resourceService: 'overviewService', action: 'getTractorOverview' })
  
  useEffect(() => {
    if (overviewByAtdaLoading) {
      setReportOverviewLoading(true)
    }
    else {
      setReportOverviewLoading(false)
      setReportOverviewByAtda(overviewByAtda)
    }
    
    if (overviewTractorLoading) {
      setTractorOverviewLoading(true)
    }
    else {
      setTractorOverviewLoading(false)
      setTractorOverview(overviewTractor)
    }
  }, [overviewByAtda, overviewByAtdaLoading, overviewTractor, overviewTractorLoading])


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

  const currentMonth = (nth = 0) => {
    moment.locale('fr')
    const month = moment().subtract(nth, 'months')
    const monthHuman = month.format("DD-MMMM-YYYY").split('-')[1]
    const monthNumber = month.get("months")
    return { monthNumber, monthHuman: monthHuman.charAt(0).toUpperCase() + monthHuman.slice(1) }
  }

  return (
    <Card>
      <CardBody>
        <div className="d-md-flex align-items-center">
          <div>
            <CardTitle>Apercu Général de { currentMonth(previousMonth).monthHuman }</CardTitle>
            {/* <CardSubtitle>Apercu de </CardSubtitle> */}
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
          <Col lg="3" className='flex flex-col'>
            {
              tractorOverviewLoading ?
              <div className="d-flex justify-content-center h-100 align-items-center">
                <Spinner className="ml-2" size="lg" color="primary" style={{width: '6rem', height: '6rem'}}></Spinner>
              </div> :
              <>
                {/* <h1 className="mb-0 mt-4">699</h1>
                <h6 className="font-light text-muted">Nombre de trateur total</h6> */}
                <div className='my-auto text-center'>
                  <h1 className="mt-8 mb-0 text-8xl">{ tractorOverview.tractorTotal }</h1>
                  <h4 className="font-light text-muted">Tracteurs tracés</h4>
                </div>
                <div className="flex space-x-4 mt-auto">
                  <button className="btn btn-info p-3 px-4" disabled={currentMonth(previousMonth).monthNumber === 0} onClick={ () => setPreviousMonth( state => ++state) }> Apercu mois précédent </button>
                  <button className="btn btn-secondary p-3 px-4" disabled={currentMonth(previousMonth).monthNumber === moment().get("months")} onClick={ () => setPreviousMonth( state => --state) }> Apercu mois suivant </button>
                </div>
              </>
            }    
          </Col>
          <Col lg="9">
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
      {/* <CardBody className="border-top">
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
      </CardBody> */}
    </Card>
  );
};

export default SalesSummary;
