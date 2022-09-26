import React, { useState, useEffect } from "react";
import { useToasts } from 'react-toast-notifications';

import { CardTitle, CardBody, Input, Button } from "reactstrap";

import TractorsTable from "../../../components/machines/tractorsTable";
import ExportToExcel from '../../../components/exportToExcel/exportToExcel'
import { useSelector } from 'react-redux'
import { saveAs } from 'file-saver'
import moment from 'moment'
import useFetchResource from '../../../hooks/useFetchResource'


export default function Tractor(props) {
  const [tractors, setTractors] = useState([]);
  const { $api, $message } = useSelector(state => state)
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [disabledDownloadBtn, setDisabledDownloadBtn] = useState(false);
  const [search, setSearch] = useState('')  
  const [filterTractors, setFilterTractors] = useState([])
  const [isRegex, setIsRegex] = useState(false);
  const { addToast } = useToasts()

  const { resourceData: tractorData, loadingState: tractorDataLoading } = useFetchResource({ errorHeader: "Liste des tracteurs", resourceService: "tractorService", action: "getAll" })

  useEffect(() => {
    if (!tractorDataLoading) {
      setTractors(tractorData)
    }
    let results = []
    if(search) {
      results = tractors.filter(tractor => isRegex ? ((new RegExp(search)).test(`${tractor.user.firstName} ${tractor.user.lastName}`) || (new RegExp(search)).test(tractor.id) || (new RegExp(search)).test(tractor.user.phone )) : `${tractor.user.firstName} ${tractor.user.lastName}`.toLowerCase().trim().includes(search.toLowerCase().trim()) || tractor.id.toLowerCase().includes(search.toLowerCase().trim()) || (Array.isArray(tractor.user.phone) ? tractor.user.phone.join(',').toLowerCase().includes(search.toLowerCase().trim()) : tractor.user.phone.toLowerCase().includes(search.toLowerCase().trim()) ) )
    } else results = tractors
    setFilterTractors(results)
  }, [isRegex, search, tractorData, tractorDataLoading, tractors])

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
    }
  }

  return (
    <TractorsTable tractors={filterTractors} loading={tractorDataLoading} title="Liste des tracteurs">
      <CardBody>
        <div className="flex">
          <Input className='rounded-r-none' type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Entrez le nom ou numéro chassis pour rechercher" />
          {/* <button onClick={() => { setIsRegex(prev => !prev) }} className={`px-4 text-white font-semibold rounded-r-sm ${isRegex ? "bg-gray-500 ring-[3px] ring-gray-300" : "bg-gray-400"}`} >Regex</button> */}
        </div>
      </CardBody>
      <CardTitle className="bg-light border-bottom p-3 mb-0 d-flex justify-content-between">
        <h2>Liste des tracteurs</h2>
        <ExportToExcel exportToExcelFn={ () => exportToExcel() } loading={downloadLoading} disabled={disabledDownloadBtn} />
      </CardTitle>
    </TractorsTable>
  );
};
