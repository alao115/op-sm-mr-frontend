import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, Row, Col, CardTitle, Spinner, Input, Button, ButtonGroup } from "reactstrap";
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import ExportToExcel from '../../components/exportToExcel/exportToExcel'
import { saveAs } from 'file-saver'
import moment from 'moment';
import useFetchResource from '../../hooks/useFetchResource'

export default function TractorHS() {

  const { $api, $message } = useSelector(state => state)
  const [tractors, setTractors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [disabledDownloadBtn, setDisabledDownloadBtn] = useState(false);
  const { addToast } = useToasts()
  const [search, setSearch] = useState('')  
  const [filterTractors, setFilterTractors] = useState([])
  const [sortedOrder, setSortOrder] = useState('')

  const { resourceData: tractorsHSData, loadingState: tractorsHSDataLoading } = useFetchResource({ errorHeader: "Liste tracteurs hors service", resourceService: "tractorService", action: "getTractorHS" })

  useEffect(() => {
    if (tractorsHSDataLoading) {
      setLoading(true)
    } else {
      setLoading(false)
      setTractors(tractorsHSData.tractors || [])
      console.log('Setting sort order ')
      setSortOrder('asc')
    }
    
    // setFilterTractors(tractors)
  }, [tractors, tractorsHSData, tractorsHSDataLoading])

  useEffect(() => {
    setFilterTractors(tractors)
  }, [tractors])

  useEffect(() => {
    let results = []
    if(search) {
      results = tractors.filter(tractor => `${tractor.user.firstName} ${tractor.user.lastName}`.toLowerCase().trim().includes(search.toLowerCase().trim()) || tractor.tractor.id.toLowerCase().includes(search.toLowerCase().trim()))
    } else results = tractors
    setFilterTractors(results)
  }, [search, tractors])

  useEffect(() => {
    console.log(sortedOrder)
    const results = tractors.sort((t1, t2) => {
      const a = moment(t1.lastReport, "DD-MM-YYYY").unix()
      const b = moment(t2.lastReport, "DD-MM-YYYY").unix()
      return sortedOrder === 'asc' ? a - b : b - a
    })
    
    setFilterTractors(results)
  }, [sortedOrder, tractors, tractorsHSDataLoading])

  async function exportToExcel() {
    try {
      setDisabledDownloadBtn(true)
      setDownloadLoading(true)
      const blobData = await $api.tractorService.exportAllTractorHSToExcel()
      setDisabledDownloadBtn(false)
      setDownloadLoading(false)
      saveAs(blobData.data, `list_tractors_hs_${moment().format("DD_MM_YYYY_HH:mm:ss")}.xlsx`)
    } catch (error) {
      setDisabledDownloadBtn(false)
      setDownloadLoading(false)
      addToast($message({ header: 'Export en Excel', message: "Une erreur s'est produite. Veuillez reessayer!" }), { appearance: 'error', autoDismiss: true })
      // console.log(error)
    }
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Entrez le nom ou numéro chassis pour rechercher" />
          </CardBody>
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <Row className="justify-content-between px-4">
              <h2 className="w-fit">Liste des tracteurs H.S</h2>
              <ExportToExcel className="flex-grow-0 w-fit" exportToExcelFn={ () => exportToExcel() } disabled={loading || disabledDownloadBtn} loading={downloadLoading}/>
            </Row>
          </CardTitle>
          {
            loading ?
            <CardBody className="text-center">
              <h4>Chargement...</h4>
              <Spinner style={{ width: '3rem', height: '3rem' }} />
            </CardBody> :
            <CardBody>
              <div className="d-flex flex-row-reverse align-items-center">
                <ButtonGroup>
                  <Button onClick={e => setSortOrder('asc')} className={ sortedOrder === 'asc' ? 'active' : '' }>Plus récent</Button>
                  <Button onClick={e => setSortOrder('desc')} className={ sortedOrder === 'desc' ? 'active' : '' }>Plus ancient</Button>
                </ButtonGroup>
                <h4 className="mr-2">Triez par: </h4>
              </div>
              <Table className="no-wrap v-middle" responsive>
                <thead>
                  <tr className="border-0">
                    <th className="border-0"><h4>Num Chassis</h4></th>
                    <th className="border-0"><h4>Propriétaire</h4></th>
                    <th className="border-0"><h4>Contact</h4></th>
                    <th className="border-0"><h4>Adresse</h4></th>
                    <th className="border-0"><h4>Dernier déplacement</h4></th>
                    <th className="border-0"><h4>HS depuis</h4></th>
                  </tr>
                </thead>
                <tbody>
                  {filterTractors.map((tractor) => {
                    return (
                      <tr key={tractor.tractor.id}>
                        <td>
                          <div className="d-flex no-block align-items-center">
                            <div className="">
                              <h5 className="mb-0 font-16 font-medium">{tractor.tractor.id}</h5>
                            </div>
                          </div>
                        </td>
                        <td>{tractor.user ? tractor.user.firstName : "Non renseigné" } {tractor.user && tractor.user.lastName}</td>
                        <td> { tractor.user.phone ? Array.isArray(tractor.user.phone) ? tractor.user.phone.filter(phone => phone !== 'None').slice(0, 2).join(' / ') : "N/A" : "N/A" } </td>
                        <td>
                          <span> { tractor.user ? tractor.user.address : "Non renseigné" } </span>
                        </td>
                        <td className="blue-grey-text  text-darken-4 font-medium"> {tractor.lastReport} </td>
                        <td className="blue-grey-text  text-darken-4 font-medium"> {tractor.elapsedTime} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          }
        </Card>
      </Col>
    </Row>
  );
};
