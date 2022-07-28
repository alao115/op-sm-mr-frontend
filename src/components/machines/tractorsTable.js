import React from "react";
import { useNavigate, } from 'react-router-dom'
import { Card, CardBody, Table, Row, Col } from "reactstrap";


export default function TractorsTable({ tractors, title, children }) {

  const navigate = useNavigate()
  // const navigate = useHistory()

  return (
    <Row>
      <Col lg="12">
        <Card>
          { children }
          <CardBody>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0"><h4>Num Chassis</h4></th>
                  <th className="border-0"><h4>Propriétaire</h4></th>
                  <th className="border-0"><h4>Contact</h4></th>
                  <th className="border-0"><h4>Adresse</h4></th>
                  <th className="border-0"><h4>Tracteur</h4></th>
                </tr>
              </thead>
              <tbody>
                {tractors.map((tractor) => {
                  return (
                    <tr className='cursor-pointer hover:bg-slate-200'  key={tractor.tractor.id} onClick={() => navigate(`/tracteurs/carnet/${tractor.tractor.id}`, { state: { tractor } })}>
                      <td>
                        <div className="d-flex no-block align-items-center">
                          <div className="">
                            <h5 className="mb-0 font-16 font-medium">{tractor.tractor.id}</h5>
                          </div>
                        </div>
                      </td>
                      <td>{tractor.user.firstName ? tractor.user.firstName : "Non renseigné" } {tractor.user.lastName}</td>
                      <td> { tractor.user.phone ? tractor.user.phone : "Non renseigné" } </td>
                      <td>
                        <span> { tractor.user.address ? tractor.user.address : "Non renseigné" } </span>
                      </td>
                      <td className="blue-grey-text  text-darken-4 font-medium"> {`${tractor.tractor.tractorType}, ${tractor.tractor.tractorMark}`} </td>
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
