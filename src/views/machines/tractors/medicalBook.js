import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, } from "reactstrap";
import { useDispatch } from 'react-redux'
import moment from 'moment';
import Tab from "../../../components/Tab/Tab";
import useFetchResource from '../../../hooks/useFetchResource';
import { setInterventionDetailPanel } from '../../../redux/settings/Action'

const MedicalBook = (props) => {
  const { tractorChassis } = useParams();
  const { state } = useLocation();
  const { tractor } = state;

  const dispatch = useDispatch();
  const params = useMemo(() => ({ tractor: tractor.id }), [tractor.id])
  const { resourceData: Interventions, loadingState: interventionLoadingState } = useFetchResource({ errorHeader: "Liste interventions", resourceService: 'interventionService', action: 'getAllByTractor', params })
  const { resourceData: Maintenances, loadingState: maintenanceLoadingState } = useFetchResource({ errorHeader: "Liste maintenances", resourceService: 'maintenanceService', action: 'getAllByTractor', params })
  const [tabData, setTabData ] = useState({})
  

  useEffect(() => {
    if (!interventionLoadingState) {
      setTabData((prevState) => ({ ...prevState, Interventions }))
    }

    if (!maintenanceLoadingState) {
      setTabData((prevState) => ({ ...prevState, Maintenances }))
    }
  }, [Interventions, Maintenances, interventionLoadingState, maintenanceLoadingState])

  function displayMaintenanceType (type) {
    switch (type) {
      case 1:
        return '300 km/h'
      case 2:
        return '600 km/h'
      default:
        return '900 km/h'
    }
  }

  function childFn(data) {
    return (
      <ul>
        {
          data.length === 0 ?
          <li>
            <h3>Pas de donnees disponibles</h3>
          </li> :
          data.map((post) => (
            <li
              key={post.id}
              onClick={ post.description ? () => dispatch(setInterventionDetailPanel({ isOpened: true, data: { ...post }})) : () => {} }
              className="relative cursor-pointer rounded-md p-3 hover:bg-gray-200 odd:bg-gray-100"
            >
              <div className="w-full flex flex-col justify-between">
                { post.description && <h3 className="text-sm font-semibold leading-5 truncate overflow-ellipsis capitalize">{post.description}</h3> }
                <h6 className="text-gray-400 font-semiboold text-xs inline p-[.2rem] pl-0 rounded-md w-fit">{ post.description ? `Mécanicien: ${post.mechanical}` : `Nom & Prénom: ${post.user?.firstName} ${post.user?.lastName}` }</h6>
                { 
                  !post.description && 
                  <>
                    <h6 className="text-gray-400 font-semiboold text-xs inline p-[.2rem] pl-0 rounded-md w-fit">Type huile: { post.typeHuile }</h6>
                    <h6 className={ `text-gray-400 font-semiboold text-xs inline p-[.2rem] pl-0 rounded-md w-fit ` }>Type maintenance: <span className={` text-white p-[.15rem] rounded-lg ${post.typeMaintenance === 1 ? 'bg-green-500' : post.typeMaintenance === 2 ? 'bg-yellow-500' : 'bg-red-500'}`}>{ displayMaintenanceType(post.typeMaintenance) }</span></h6>
                  </>
                }
              </div>
              

              <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                {/* {
                  post.description && 
                  <>
                    <li><span className='font-bold text-gray-500'>{post.tractor.id}---</span></li>
                    <li>&middot;</li>
                  </>
                } */}
                <li><span className='text-slate-400'>{moment.unix(post.date).format("DD-MM-YYYY")}</span></li>
                <li>&middot;</li>
                <li>
                  <span className="bg-slate-300 text-gray-500 font-medium px-2 rounded-lg text-xs lowercase">{ post.description ? (post.status ? "Resolue" : "Non Resolue") : `${post.hmMaintenance} km/h` }</span>
                </li>
              </ul>
            </li>
        ))}
      </ul>
    );
  } 

  return (
    <>
      <Card className="p-3 mb-12">
        <h2>
          N<sup>o</sup> Chassis: {tractorChassis}
        </h2>
        <h5 className="text-muted font-light">
          Nom & Prenom: {tractor.user.lastName} {tractor.user.firstName}
        </h5>
        <h5 className="font-light">Tel: {tractor.user.phone}</h5>
        <h5 className="font-light">Adresse: {tractor.user.address}</h5>
      </Card>

      <Card>
        <div className="flex justify-center">
          <Tab childFn={childFn} tabData={tabData} loadingState={maintenanceLoadingState || interventionLoadingState} />
        </div>
      </Card>
    </>
  );
};

export default MedicalBook;
