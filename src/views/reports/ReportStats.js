import React, { useState, useEffect, useReducer } from "react";
import { saveAs } from 'file-saver';

import {
  Card,
  CardTitle,
  CardBody,
  Table,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Form,
  Label,
  Spinner
} from "reactstrap";

import moment from "moment";
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import AutoCompletion from '../../components/autocompletion/AutoCompletionInput'
import ExportToExcel from '../../components/exportToExcel/exportToExcel'
import useFetchResource from '../../hooks/useFetchResource'
import { useMemo } from 'react'

export default function ReportStat(props) {
  const { $api, $message } = useSelector(state => state)
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tractorLoading, setTractorLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [disabledDownloadBtn, setDisabledDownloadBtn] = useState(false);
  const [filename, setFilename] = useState('');
  const [submitExecuteReportState, setSubmitExecuteReportState] = useState(true)
  const [tractors, setTractors] = useState([]);
  const { addToast } = useToasts()
  const [message, setMessage] = useState('Exécutez un rapport!')
  const [autoCompletionData, setAutoCompletionData] = useState([])

  function setExecuteReportState(report) {
    setSubmitExecuteReportState(!report.from || !report.to || moment(report.from, "YYYY-MM-DD").isAfter(moment(report.to, "YYYY-MM-DD")))
  }

  function reportReducer(state, { type, value }) {
    switch (type) {
      case 'setAtda':
        const report = { ...state, atda: value }
        setExecuteReportState(report)
        return report
      case 'setTractor': 
        const report_1 = { ...state, id: value }
        setExecuteReportState(report_1)
        return report_1
      case 'setStart':
        const report_2 = { ...state, from: value }
        setExecuteReportState(report_2)
        return report_2
      case 'setEnd':
        const report_3 = { ...state, to: value }
        setExecuteReportState(report_3)
        return report_3
      default: return state
    }
  } 

  const [reportData, dispatch] = useReducer(reportReducer, { atda: '', id: '', from: '', to: ''})

  const params = useMemo(() => ({ page: 0, limit: 0 }), [])
  const { resourceData: tractorsData, loadingState: tractorsDataLoading } = useFetchResource({ initialState: { data: [] }, errorHeader: "Liste des tracteurs", resourceService: "tractorService", action: "getAll", params })

  useEffect(() => {
    if (tractorsDataLoading && !tractorsData.data.length) {
      setTractorLoading(true)
    } else {
      setTractors(tractorsData.data)
      setTractorLoading(false)
    }

    if (moment(reportData.from, "YYYY-MM-DD").isAfter(moment(reportData.to, "YYYY-MM-DD")))
      addToast($message({ header: 'Execution rapport', message: "Date début est superieur à date fin" }), { appearance: 'error', autoDismiss: true })

    if(filename) {
      setDisabledDownloadBtn(!!!filename)
    }

    if (tractors.length > 0)
      setAutoCompletionData([ { label: 'Tout', value: '' }, ...tractors?.map(tractor => ({ label: `${tractor.id}: ${tractor.user.lastName} ${tractor.user.firstName}`, value: tractor.id }))])

  }, [$message, addToast, filename, reportData.from, reportData.to, tractors, tractorsData, tractorsDataLoading])

  // useEffect(() => {
  // }, [tractors])

  async function executeReport(e) {
    try {
      e.preventDefault();

      setSubmitExecuteReportState(true)
      setLoading(true)

      if (reportData.atda) {
        const { data } = await $api.reportService.executeReportbyATDA({ ...reportData, from: moment(reportData.from).format("DD-MM-YYYY"), to: moment(reportData.to).format("DD-MM-YYYY") })
        setReports(data)  
      } 
      else {
        const { data } = await $api.reportService.executeReport({ ...reportData, from: moment(reportData.from).format("DD-MM-YYYY"), to: moment(reportData.to).format("DD-MM-YYYY") })
        setReports(data.data)  
        setFilename(data.filename)
      }
      
      setSubmitExecuteReportState(false)
      setLoading(false)
      // clearExecuteReportForm()
    } catch (error) {
      console.log(error)
      setSubmitExecuteReportState(false)
      setLoading(false)
      setReports([])
      setMessage("Une erreur s'est produite. Veuillez reessayer!")
    }
  }

  async function downloadReport() {
    try {
      if (filename) {
        setDownloadLoading(true)
        const blobFile = await $api.reportService.downloadReportStat({ filename })
        saveAs(blobFile.data, JSON.parse(blobFile.config.data).filename.replace('reports/', ''))
        setDownloadLoading(false)
      }
    } catch (error) {
      setDownloadLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <Card>
        <CardTitle className="border-bottom p-3">Exécuter un rapport</CardTitle>
        {
          tractorLoading ? 
          <CardBody className="text-center">
            <h4>Chargement...</h4>
            <Spinner style={{ width: '3rem', height: '3rem' }} />
          </CardBody> :
          <CardBody>
            <Form onSubmit={executeReport}>
              <Row>
                <Col md="3">
                  <FormGroup>
                    <Label for="">ATDA: </Label>
                    <Input type="select" value={reportData.atda} onChange={ (e) => dispatch({ type: 'setAtda', value: e.target.value }) } disabled={reportData.id} >
                      <option value="">Selectionner un atda</option>
                      <option value="0">Tout les atda</option>
                      {[1, 2, 3, 4, 5, 6, 7].map((atda) => ( <option key={atda} value={atda}> {`ATDA ${atda}`} </option>))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <AutoCompletion placeholder="Selectionner un tracteur" label='Tracteur' onChange={ (e) => dispatch({ type: 'setTractor', value: e.value }) } suggestions={ reportData.atda ? [] : autoCompletionData } disabled={!!reportData.atda} />
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Début: </Label>
                    <Input type="date" value={reportData.from} placeholder="md-11" onChange={ (e) => dispatch({ type: 'setStart', value: e.target.value }) } />
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup>
                    <Label>Fin: </Label>
                    <Input type="date" value={reportData.to} placeholder="md-11" onChange={ (e) => dispatch({ type: 'setEnd', value: e.target.value }) } />
                  </FormGroup>
                </Col>
              </Row>
              <div className="float-right">
                <Button color="primary" type="submit" className="mr-2" disabled={ submitExecuteReportState }>
                  Exécuter
                  { loading && <Spinner size="sm" color="light" className="ml-2" />}
                </Button>
              </div>
            </Form>
          </CardBody>
        }
      </Card>

      <Row>
        <Col lg="12">
          {
            loading ? 
            <Card className="text-center">
              <CardBody>
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </CardBody>
            </Card> :

            reports.length === 0 && message ? 
            <Card className="text-center">
              <CardBody>
                <h5>{message}</h5>
              </CardBody>
            </Card> : 
            
            <Card>
              <CardTitle className="bg-light border-bottom p-3 mb-0 d-flex justify-content-between">
                { `Rapport: ${reportData.from} - ${reportData.to}` }
                { !reportData.atda && <ExportToExcel exportToExcelFn={ downloadReport } loading={ downloadLoading } disabled={ disabledDownloadBtn }/> }
              </CardTitle>
              <CardBody>
                {
                  reportData.atda ? <Table className="no-wrap v-middle" responsive>
                    <thead>
                      <tr className="border-0">
                        <th className="border-0">ATDA</th>
                        <th className="border-0">Taille ATDA</th>
                        <th className="border-0">Heure moteur totale</th>
                        <th className="border-0">Vitesse totale</th>
                        <th className="border-0">Distance totale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.filter(re => re.atda).sort((r1, r2) => parseInt(r1.atda) - parseInt(r2.atda) ).map((report, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex no-block align-items-center">
                                <div className="">
                                  <h5 className="mb-0 font-16 font-medium">
                                    {report.ATDA || report.atda}
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{report.tailleATDA}</td>
                            <td>{report.heure_moteurs}</td>
                            <td> {report.vitesses} </td>
                            <td> {report.distances} </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table> :
                    <Table className="no-wrap v-middle" responsive>
                    <thead>
                      <tr className="border-0">
                        <th className="border-0">Tracteur</th>
                        <th className="border-0">Heure moteur totale</th>
                        <th className="border-0">Heure moteur moyenne</th>
                        <th className="border-0">Vitesse totale</th>
                        <th className="border-0">Vitesse moyenne</th>
                        <th className="border-0">Distance totale</th>
                        <th className="border-0">Distance moyenne</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex no-block align-items-center">
                                <div className="">
                                  <h5 className="mb-0 font-16 font-medium">
                                    {report.tractorID}
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{report.hmoteur}</td>
                            <td>{report.hmoteurMoyenne}</td>
                            <td>{report.vitesse}</td>
                            <td>{report.vitesseMoyenne}</td>
                            <td> {report.distance} </td>
                            <td> {report.distanceMoyenne} </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>

                }
              </CardBody>
            </Card>
          }
        </Col>
      </Row>
    </>
  );
};
