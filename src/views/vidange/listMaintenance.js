import moment from 'moment'
import React, { useState, useEffect }from "react";
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications';
import { Card, CardTitle, CardBody, Table, Row, Col } from "reactstrap";


export default function ListMaintenance(props) {
  const [maintenances, setMaintenances] = useState([]);
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()

  useEffect(() => {
    $api.maintenanceService.getAll()
      .then(({ data }) => {
        data && setMaintenances(data)
      }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Liste maintenances', message }), { appearance: 'error', autoDismiss: true })
      })
  }, [$api, $message, addToast]);

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <h2>Liste des maintenances</h2>
          </CardTitle>
          <CardBody>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Date</th>
                  <th className="border-0">Tracteur</th>
                  <th className="border-0">Heure Moteur</th>
                  <th className="border-0">Type Maintenance</th>
                  <th className="border-0">Type Huile</th>
                  <th className="border-0">Nom & Prénom</th>
                </tr>
              </thead>
              <tbody>
                {
                  maintenances.length > 0 ? maintenances.map((maintenance) => {
                    return (
                      <tr key={maintenance.id}>
                        <td>
                          <h5 className="mb-0 font-16 font-medium">{ moment.unix(maintenance.date).format("DD-MM-YYYY")}</h5>
                        </td>
                        <td> { maintenance.tractor } </td>
                        <td>{maintenance.hmMaintenance}</td>
                        <td>{maintenance.typeMaintenance}</td>
                        <td>
                          <span>
                            { maintenance.typeHuile }
                          </span>
                        </td>
                        <td>{`${maintenance.user.firstName} ${maintenance.user.lastName}`}</td>
                      </tr>
                    );
                  }) :

                  <tr>
                    <td colSpan="4" align='center'><h5>Pas de maintenances</h5></td>
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
