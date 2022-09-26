import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications';

import EntretienTable from '../../components/vidanges/entretienTable';


export default function VidangeEntretienDu(props) {
  const [tractors, setTractors] = useState([]);
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()

  useEffect(() => {
    $api.maintenanceService.getAllCheckMaintenances()
      .then(({ data }) => {
        setTractors((data || []));
        // console.log(data)
      }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Liste entretien dues', message }), { appearance: 'error', autoDismiss: true })
      })
  }, [$api, $message, addToast]);

  return tractors.length > 0 && <EntretienTable tractors={tractors}></EntretienTable>
};
