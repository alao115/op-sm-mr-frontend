import moment from 'moment'
import React, { useState, useEffect }from "react";
import { useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications';
import { Card, CardTitle, CardBody, Table, Row, Col, Spinner } from "reactstrap";
import Switch from "react-bootstrap-switch";
import "react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css";


export default function ListFailure(props) {
  const [failures, setFailures] = useState([]);
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()
  const [selectedFailure, setSelectedFailure] = useState(new Set())

  useEffect(() => {
    $api.failureService.getAll()
      .then(({ data }) => {
        data && setFailures(data)
      }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Liste pannes', message }), { appearance: 'error', autoDismiss: true })
      })
  }, [$api, $message, addToast]);

  async function changeFailureState (e, failure) {
    try {
      setSelectedFailure(prevState => {
        prevState.add(failure.id)
        return prevState
      })
      await $api.failureService.update(failure.id, { status: e })
    } catch (error) {
      const message = error?.response?.data.error.message || error.message;
      addToast($message({ header: 'Liste pannes', message }), { appearance: 'error', autoDismiss: true })
    }
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <h2>Liste des pannes</h2>
          </CardTitle>
          <CardBody>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Date</th>
                  <th className="border-0">Tracteur</th>
                  <th className="border-0">Description</th>
                  <th className="border-0">Statut</th>
                </tr>
              </thead>
              <tbody>
                {
                  failures.length > 0 ? failures.map((failure) => {
                    return (
                      <tr key={failure.id}>
                        <td>
                          <h5 className="mb-0 font-16 font-medium">{ moment.unix(failure.date).format("DD-MM-YYYY")}</h5>
                        </td>
                        <td> { failure.tractor } </td>
                        <td>{failure.description}</td>
                        <td>
                          {<span className='d-flex align-items-center'>
                            <Switch key={failure.id} defaultValue={failure.status} onText="Résolue" offText="Non résolue" onChange={(e) =>  { changeFailureState(e.state.value, failure); console.log(selectedFailure.has(failure.id)) }} />
                            { ((id) => selectedFailure.has(id))(failure.id) && <Spinner className="ml-4"/> }
                          </span>}
                        </td>
                        {/* <td className="blue-grey-text  text-darken-4 font-medium"> {`${failure.failure.failureType}, ${failure.failure.failureMark}`} </td>
                        <td className="blue-grey-text  text-darken-4 font-medium"> {failure.type} </td>
                        <td className="blue-grey-text  text-darken-4 font-medium"> {failure.hmTotalFromLastMaintenance.toFixed(2)} </td> */}
                      </tr>
                    );
                  }) :

                  <tr>
                    <td colSpan="4" align='center'><h5>Pas de pannes</h5></td>
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
