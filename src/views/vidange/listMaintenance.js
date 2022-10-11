import moment from 'moment'
import React, { useState, useEffect, useMemo }from "react";
import { Card, CardTitle, CardBody, Table, Row, Col } from "reactstrap";
import useFetchResource from '../../hooks/useFetchResource'


export default function ListMaintenance(props) {
  const [maintenances, setMaintenances] = useState([]);

  const params = useMemo(() => ({ page: 0, limit: 1 }), [])
  const { resourceData: maintenancesData, loadingState: maintenancesDataLoading } = useFetchResource({ errorHeader: "Liste des maintenances", resourceService: "maintenanceService", action: "getAll", params })

  useEffect(() => {
    if (maintenancesDataLoading && !maintenancesData.length) {
    } else {
      setMaintenances(maintenancesData)
    }
  }, [maintenancesData, maintenancesDataLoading])

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
