import React, { useState, useEffect, useReducer } from "react";

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
import { saveAs } from 'file-saver'
import useFetchResource from '../../hooks/useFetchResource'
import { useMemo } from 'react'

export default function Reports(props) {
  const { $api, $message } = useSelector(state => state)
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tractorLoading, setTractorLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [disabledDownloadBtn, setDisabledDownloadBtn] = useState(false);
  const [submitExecuteReportState, setSubmitExecuteReportState] = useState(true)
  const [tractors, setTractors] = useState([]);
  const { addToast } = useToasts()
  const [message, setMessage] = useState('Exécutez un rapport!')

  function setExecuteReportState(report) {
    setSubmitExecuteReportState(!report.from || !report.to || moment(report.from, "YYYY-MM-DD").isAfter(moment(report.to, "YYYY-MM-DD")))
  }

  function reportReducer(state, { type, value }) {
    switch (type) {
      case 'setTractor': 
        const report_1 = { ...state, tractor: value.tractorID }
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

  const [reportData, dispatch] = useReducer(reportReducer, { tractor: '', from: '', to: '' })

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
  }, [$message, addToast, reportData.from, reportData.to, tractorsData, tractorsDataLoading])

  async function executeReport(e) {
    try {
      e.preventDefault();

      setSubmitExecuteReportState(true)
      setLoading(true)

      const { data } = await $api.reportService.fineSearch({ options: { tractor: reportData.tractor, from: moment(reportData.from, "YYYY-MM-DD").format("DD-MM-YYYY"), to: moment(reportData.to, "YYYY-MM-DD").format("DD-MM-YYYY") } })
      setReports(data)
      
      setSubmitExecuteReportState(false)
      setLoading(false)
      // clearExecuteReportForm()
    } catch (error) {
      setSubmitExecuteReportState(false)
      setLoading(false)
      setReports([])
      addToast($message({ header: 'Execution rapport', message: "Une erreur s'est produite. Veuillez reessayer!" }), { appearance: 'error', autoDismiss: true })
      setMessage("Une erreur s'est produite. Veuillez reessayer!")
    }
  }

  async function exportToExcel() {
    try {
      setDisabledDownloadBtn(true)
      setDownloadLoading(true)
      const blobData = await $api.reportService.downloadReportToExcel({ tractor: reportData.tractor, from: moment(reportData.from, "YYYY-MM-DD").format("DD-MM-YYYY"), to: moment(reportData.to, "YYYY-MM-DD").format("DD-MM-YYYY")})
      setDisabledDownloadBtn(false)
      setDownloadLoading(false)
      saveAs(blobData.data, `report_${reportData.from}_${reportData.to}.xlsx`)
    } catch (error) {
      setDisabledDownloadBtn(false)
      setDownloadLoading(false)
      addToast($message({ header: 'Export en Excel', message: "Une erreur s'est produite. Veuillez reessayer!" }), { appearance: 'error', autoDismiss: true })
      // console.log(error)
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
                <Col md="4">
                  <AutoCompletion placeholder="Selectionner un tracteur" label='Tracteur' onChange={ (e) => dispatch({ type: 'setTractor', value: e.value }) } suggestions={ [ { label: 'Tout', value: '' }, ...tractors?.map(tractor => ({ label: `${tractor.id}: ${tractor.user.lastName} ${tractor.user.firstName}`, value: { emei: tractor.emeiTracteur,tractorID: tractor.id } }))] }/>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Début: </Label>
                    <Input type="date" value={reportData.from} placeholder="md-11" onChange={ (e) => dispatch({ type: 'setStart', value: e.target.value }) } />
                  </FormGroup>
                </Col>
                <Col md="4">
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
                <ExportToExcel exportToExcelFn={exportToExcel} loading={downloadLoading} disabled={disabledDownloadBtn}/>
              </CardTitle>
              <CardBody>
                <Table className="no-wrap v-middle" responsive>
                  <thead>
                    <tr className="border-0">
                      <th className="border-0">Tracteur</th>
                      <th className="border-0">Date</th>
                      <th className="border-0">Heure moteur</th>
                      <th className="border-0">Distance</th>
                      <th className="border-0">Nbre Arrets</th>
                      <th className="border-0">Nbre Stationnements</th>
                      <th className="border-0">Vitesse Max</th>
                      <th className="border-0">Vitesse Moy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      reports.map((report, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex no-block align-items-center">
                                <div className="">
                                  <h5 className="mb-0 font-16 font-medium">
                                    {report.tractor}
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{report.dateHuman}</td>
                            <td> {report.nbreHM} </td>
                            <td> {report.distance_en_km} </td>
                            <td> {report.nbreArrets} </td>
                            <td> {report.nbreStationnements} </td>
                            <td> {report.vitesseMax} </td>
                            <td> {report.vitesseMoyenne} </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          }
        </Col>
      </Row>
    </>
  );
};
