import React, { useState, useEffect, } from "react";

import EntretienTable from '../../components/vidanges/entretienTable';
import useFetchResource from '../../hooks/useFetchResource'


export default function VidangeEntretienDu(props) {
  const [tractors, setTractors] = useState([]);

  const { resourceData: tractorsData, loadingState: tractorsDataLoading } = useFetchResource({ errorHeader: "Liste entretien dues", resourceService: "maintenanceService", action: "getAllCheckMaintenances" })

  useEffect(() => {
    if (tractorsDataLoading && !tractorsData.length) {
    } else {
      setTractors(tractorsData)
    }
  }, [tractorsData, tractorsDataLoading])

  return tractors.length > 0 && <EntretienTable tractors={tractors}></EntretienTable>
};
