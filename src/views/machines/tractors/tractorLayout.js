import React  from "react";
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom";
import InterventionDetail from '../../../components/interventionDetail/InterventionDetail';

export default function TractorListLayout() {

  const { interventionDetailPanel } = useSelector(state => state.settings)

  // console.log(interventionDetailPanel)

  return (
    <div className="tractor-container">
      <Outlet />
      {
        interventionDetailPanel.isOpened && <InterventionDetail data={interventionDetailPanel.data} />
        
      }
    </div>
  );
}
