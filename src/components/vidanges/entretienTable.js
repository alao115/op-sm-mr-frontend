import React, { useState, useEffect, useCallback }from "react";

import { Card, CardTitle, CardBody, Table, Row, Col, Button  } from "reactstrap";


export default function EntretienTable({ tractors }) {
  const [tableData, setTableData] = useState([]);

  const filtrer = useCallback((type) => {

    switch(type) {
      case '300':
        setTableData(tractors.filter(tr => tr.typeMaintenance === 1));
        break;
      case '600':
        setTableData(tractors.filter(tr => tr.typeMaintenance === 2));
        break;
      case '900':
        setTableData(tractors.filter(tr => tr.typeMaintenance === 3));
        break;
      default:
        setTableData(tractors)
    }
  }, [tractors])

  const tractorType = (type) => type === 1 ? "Tracteur": "Motoculteur"

  useEffect(() => {
    filtrer('')
  }, [filtrer])
  
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <h2>Liste des entretiens dus</h2>
            <div>
              <Button onClick={() => filtrer("300")} color="secondary" className="ml-3" outline>
                  300 
              </Button>
              <Button onClick={() => filtrer("600")} color="info" className="ml-3" outline>
                  600 
              </Button>
              <Button onClick={() => filtrer("900")} color="warning" className="ml-3" outline>
                  900 
              </Button>
              <Button onClick={() => filtrer("")} color="success" className="ml-3">
                  Reinitialiser 
              </Button>
            </div>
          </CardTitle>
          <CardBody>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Num Chassis</th>
                  <th className="border-0">Propriétaire</th>
                  <th className="border-0">Contact</th>
                  <th className="border-0">Adresse</th>
                  <th className="border-0">Tracteur</th>
                  <th className="border-0">Type maintenance</th>
                  <th className="border-0">Heure moteur</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((tractor) => {
                  return (
                    <tr key={tractor.id}>
                      <td>
                        <div  className={"d-flex no-block align-items-center"+ (tractor.tractor.id==='14D152' ? 'red' : '')+ (tractor.tractor.id==='14D152' ? 'jaune' : '') + (tractor.tractor.id==='14D152' ? 'jaune' : '') }>
                          <div className="">
                            <h5 className="mb-0 font-16 font-medium">{tractor.tractor._id}</h5>
                          </div>
                        </div>
                      </td>
                      <td>{tractor.user?.firstName} {tractor.user?.lastName}</td>
                      <td> { tractor.user?.phone ? Array.isArray(tractor.user.phone) ? tractor.user.phone.filter(phone => phone !== 'None').slice(0, 2).join(' / ') : "N/A" : "N/A" } </td>
                      <td>
                        <span> {tractor.user?.address} </span>
                      </td>
                      <td className="blue-grey-text  text-darken-4 font-medium"> {`${tractorType(tractor.tractor.type)}, ${tractor.tractor.tractorMark}`} </td>
                      <td className="blue-grey-text  text-darken-4 font-medium"> {tractor.type} </td>
                      <td className="blue-grey-text  text-darken-4 font-medium"> {tractor.hmTotalFromLastMaintenance.toFixed(2)} </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

