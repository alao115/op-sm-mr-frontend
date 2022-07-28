import React, { useState, useEffect } from "react";
import { useToasts } from 'react-toast-notifications';

import { CardTitle, CardBody, Input } from "reactstrap";

import TractorsTable from "../../../components/machines/tractorsTable";
import ExportToExcel from '../../../components/exportToExcel/exportToExcel'
import { useSelector } from 'react-redux'
import { saveAs } from 'file-saver'
import moment from 'moment'


export default function Tractor(props) {
  const [tractors, setTractors] = useState([]);
  const { $api, $message } = useSelector(state => state)
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [disabledDownloadBtn, setDisabledDownloadBtn] = useState(false);
  const [search, setSearch] = useState('')  
  const [filterTractors, setFilterTractors] = useState([])
  const { addToast } = useToasts()

  useEffect(() => {
    $api.tractorService.getAll().then((response) => {
      response.data && setTractors(response.data);
    }).catch(err =>  addToast($message({ header: 'Liste des tracteurs', message: "Une erreur s'est produite. Veuillez reessayer." }), { appearance: "error", autoDismiss: true }));
  }, [$api, addToast, $message]);

  async function exportToExcel() {
    try {
      setDisabledDownloadBtn(true)
      setDownloadLoading(true)
      const blobData = await $api.tractorService.exportAllTractorToExcel()
      setDisabledDownloadBtn(false)
      setDownloadLoading(false)
      saveAs(blobData.data, `list_tractors_${moment().format("DD_MM_YYYY_HH:mm:ss")}.xlsx`)
    } catch (error) {
      setDisabledDownloadBtn(false)
      setDownloadLoading(false)
      addToast($message({ header: 'Export en Excel', message: "Une erreur s'est produite. Veuillez reessayer!" }), { appearance: 'error', autoDismiss: true })
      // console.log(error)
    }
  }

  useEffect(() => {
    let results = []
    if(search) {
      results = tractors.filter(tractor => `${tractor.user.firstName} ${tractor.user.lastName}`.toLowerCase().trim().includes(search.toLowerCase().trim()) || tractor.tractor.id.toLowerCase().includes(search.toLowerCase().trim()) || tractor.user.phone.toLowerCase().includes(search.toLowerCase().trim()) )
    } else results = tractors
    setFilterTractors(results)
  }, [search, tractors])

  return (
    <TractorsTable tractors={filterTractors} title="Liste des tracteurs">
      <CardBody>
        <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Entrez le nom ou numéro chassis pour rechercher" />
      </CardBody>
      <CardTitle className="bg-light border-bottom p-3 mb-0 d-flex justify-content-between">
        <h2>Liste des tracteurs</h2>
        <ExportToExcel exportToExcelFn={ () => exportToExcel() } loading={downloadLoading} disabled={disabledDownloadBtn} />
      </CardTitle>
    </TractorsTable>
  );
};
