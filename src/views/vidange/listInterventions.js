import moment from 'moment'
import React, { useState, useEffect, useMemo }from "react";
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications';
import { Card, CardTitle, CardBody, Table, Row, Col } from "reactstrap";
import Switch from "react-bootstrap-switch";
import "react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css";
import useFetchResource from '../../hooks/useFetchResource'


export default function ListInterventions(props) {
  const [interventions, setInterventions] = useState([]);
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()

  const params = useMemo(() => ({ page: 0, limit: 1 }), [])
  const { resourceData: interventionsData, loadingState: interventionsDataLoading } = useFetchResource({ errorHeader: "Liste des interventions", resourceService: "interventionService", action: "getAll", params })

  useEffect(() => {
    if (interventionsDataLoading && !interventionsData.length) {
    } else {
      setInterventions(interventionsData)
    }
  }, [interventionsData, interventionsDataLoading])

  async function changeInterventionState (e, intervention) {
    try {
      await $api.interventionService.update(intervention.id, { status: e })  
    } catch (error) {
      const message = error?.response?.data.error.message || error.message;
      addToast($message({ header: 'Liste interventions', message }), { appearance: 'error', autoDismiss: true })
    }
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <h2>Liste des interventions</h2>
          </CardTitle>
          <CardBody>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Date</th>
                  <th className="border-0">Tracteur</th>
                  <th className="border-0">Description</th>
                  <th className="border-0">Mecanicien</th>
                  <th className="border-0">Statut</th>
                </tr>
              </thead>
              <tbody>
                {
                  interventions.length > 0 ? interventions.map((intervention) => {
                    return (
                      <tr key={intervention.id}>
                        <td>
                          <h5 className="mb-0 font-16 font-medium">{ moment.unix(intervention.date).format("DD-MM-YYYY") }</h5>
                        </td>
                        <td> { intervention.tractor } </td>
                        <td>{intervention.description}</td>
                        <td> </td>
                        <td>
                          <span>
                            <Switch key={intervention.id} defaultValue={intervention.status} onText="R??solue" offText="Non r??solue" onChange={(e) =>  changeInterventionState(e.state.value, intervention)} />
                          </span>
                        </td>
                      </tr>
                    );
                  }) :

                  <tr>
                    <td colSpan="5" align='center'><h5>Pas d'interventions</h5></td>
                  </tr>
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
