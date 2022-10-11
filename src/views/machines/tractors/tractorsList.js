import React, { useState, useEffect, useMemo } from "react";
import { useToasts } from 'react-toast-notifications';
import { CardTitle, CardBody, Input } from "reactstrap";

import TractorsTable from "../../../components/machines/tractorsTable";
import ExportToExcel from '../../../components/exportToExcel/exportToExcel'
import { useSelector } from 'react-redux'
import { saveAs } from 'file-saver'
import moment from 'moment'
import useFetchResource from '../../../hooks/useFetchResource'


export default function Tractor(props) {
  const [tractors, setTractors] = useState({ data: [] });
  const { $api, $message } = useSelector(state => state)
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [disabledDownloadBtn, setDisabledDownloadBtn] = useState(false);
  const [search, setSearch] = useState('')  
  const [filterTractors, setFilterTractors] = useState({data: []})
  const { addToast } = useToasts()
  const [page, setPage] = useState(0)
  const [limit, ] = useState(10)

  const requestParams = useMemo(() => ({ page: page * limit, limit }), [page, limit])
  const { resourceData: tractorData, loadingState: tractorDataLoading } = useFetchResource({ initialState: { data: [] }, errorHeader: "Liste des tracteurs", resourceService: "tractorService", action: "getAll", params: requestParams })

  useEffect(() => {
    if (!tractorDataLoading) {
      setTractors(tractorData)
    }

    let results = { data: [] }
    if(search) {
      results.data = tractors.data.filter(tractor => `${tractor.user.firstName} ${tractor.user.lastName}`.toLowerCase().trim().includes(search.toLowerCase().trim()) || tractor.id.toLowerCase().includes(search.toLowerCase().trim()) || (Array.isArray(tractor.user.phone) ? tractor.user.phone.join(',').toLowerCase().includes(search.toLowerCase().trim()) : tractor.user.phone.toLowerCase().includes(search.toLowerCase().trim()) ) )
      results.total = results.data.length
    } else results = tractors
    setFilterTractors(results)
    
  }, [search, tractorData, tractorDataLoading, tractors])

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

  const pageNumber = (page) => {
    setPage(page)
  }

  return (
    <TractorsTable tractors={filterTractors.data} loading={tractorDataLoading} title="Liste des tracteurs" paginationObj={{getPageNumber: pageNumber, totalCount: filterTractors.total }} >
      <CardBody>
        <div className="flex">
          <Input className='rounded-r-none' type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Entrez le nom ou numéro chassis pour rechercher" />
        </div>
      </CardBody>
      <CardTitle className="bg-light border-bottom p-3 mb-0 d-flex justify-content-between">
        <h2>Liste des tracteurs</h2>
        <ExportToExcel exportToExcelFn={ () => exportToExcel() } loading={downloadLoading} disabled={disabledDownloadBtn} />
      </CardTitle>
    </TractorsTable>
  );
};
