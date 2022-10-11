import React, { useState } from "react";
import { useNavigate, } from 'react-router-dom'
import { Card, CardBody, Table, Row, Col, Spinner } from "reactstrap";
import FeatherIcon from "feather-icons-react";
// import _ from 'lodash'
import Pagination from '../pagination/Pagination';


export default function TractorsTable({ tractors, title, children, loading = false, paginationObj = { totalCount: 0, getPageNumber: (page) => {} } }) {

  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const setPageNumber = (page) => {
    setPage(page)
    paginationObj.getPageNumber(page - 1)
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          { children }
          <CardBody>
          {
            loading && tractors.length < 0 ?
            <div className="d-flex justify-content-center w-full align-items-center">
              <Spinner className="ml-2" size="lg" color="primary" style={{width: '6rem', height: '6rem'}}></Spinner>
            </div>:
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0"><h4>Num Chassis</h4></th>
                  <th className="border-0"><h4>Propriétaire</h4></th>
                  <th className="border-0"><h4>Contact</h4></th>
                  <th className="border-0"><h4>Adresse</h4></th>
                  <th className="border-0"><h4>Tracteur</h4></th>
                  {/* <th></th> */}
                </tr>
              </thead>
              
              <tbody>
                {tractors.map((tractor) => {
                  return (
                    <tr className='cursor-pointer hover:bg-slate-200'  key={tractor.id}>
                      <td>
                        <div className="d-flex no-block align-items-center">
                          <div className="">
                            <h5 className="mb-0 font-16 font-medium">{tractor.id}</h5>
                          </div>
                        </div>
                      </td>
                      <td>{tractor.user.firstName ? tractor.user.firstName : "Non renseigné" } {tractor.user.lastName}</td>
                      <td> { tractor.user.phone ? Array.isArray(tractor.user.phone) ? tractor.user.phone.filter(phone => phone !== 'None').slice(0, 2).join(' / ') : "N/A" : "N/A" } </td>
                      <td>
                        <span> { tractor.user.address ? tractor.user.address : "Non renseigné" } </span>
                      </td>
                      <td className="blue-grey-text  text-darken-4 font-medium"> {`${tractor.type === 1 ? 'Tracteur' : 'Motoculteur'}, ${tractor.tractorMark}`} </td>
                      <td className='space-x-2'>
                        <span onClick={() => navigate(`/tracteurs/carnet/${tractor.id}`, { state: { tractor } })} className='bg-slate-300 w-14  inline-flex text-gray-500 p-1 px-3 rounded-full hover:bg-slate-400 hover:text-white shadow-lg shadow-slate-700'><FeatherIcon className="h-4" icon="eye" /></span>
                        <span onClick={() => navigate(`/tracteurs/edit/${tractor.id}`, { state: { tractor } })} className='bg-slate-300 w-14  inline-flex text-gray-500 p-1 px-3 rounded-full hover:bg-slate-400 hover:text-white shadow-lg shadow-slate-700'><FeatherIcon className="h-4" icon="edit" /></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>}
            {
              paginationObj.getPageNumber &&
              <div className="flex w-full justify-end">
                <Pagination className="flex mt-4 mb-0" currentPage={page} totalCount={paginationObj.totalCount} pageSize={10} onPageChange={ page => setPageNumber(page) } />
              </div>
            }
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
