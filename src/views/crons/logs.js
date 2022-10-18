import React, { useState, useEffect} from "react";

import { Card, CardTitle, CardBody, Table, Row, Col, Badge, Button, ButtonGroup } from "reactstrap";
import moment from 'moment';
import { useSelector } from 'react-redux'


export default function Logs(props) {

  const [logs, setLogs] = useState([])
  const $api = useSelector(state => state.$api)
  const [filter, setFilter] = useState('')


  useEffect(() => {
    console.log('useEffect hook...')
    const eventSource = $api.logService.getLogs() //.then(({ data }) => setLogs(data.logs))
    eventSource.onmessage = (e) => {
      console.log('Received: ')
      console.log(e)
    }

  }, [$api])

  // useEffect(() => { 
  //   const tempData = [ ...logs]
  //   if(filter) {
  //     const filteredData = tempData.filter(log => log.level === filter)
  //     setLogs(filteredData)
  //   } else {
  //     setLogs(tempData)
  //   }
  // }, [filter, logs])


  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <h2>Logs : { moment().format("YYYY-MM-DD") }</h2>
          </CardTitle>
          <CardBody className="d-flex">
            <h3 className='mr-3'>Filter par: </h3>
            <div>
              <ButtonGroup>
                <Button color="info" onClick={() => setFilter("info")} >Info</Button>
                <Button color="warning" onClick={() => setFilter("error")} >Erreur</Button>
              </ButtonGroup>
            </div>
            <Button className='ml-4' color="danger" onClick={() => setFilter("")} >Reset</Button>
           </CardBody>
          <CardBody>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">No</th>
                  <th className="border-0">Timestamp</th>
                  <th className="border-0">Level</th>
                  <th className="border-0">Message</th>
                  <th className="border-0">Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => {
                  return (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>
                        <div className="d-flex no-block align-items-center">
                          <div className="">
                            <h5 className="mb-0 font-16 font-medium">{ log.timestamp }</h5>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h4>
                          <Badge color={log.level === "info" ? "success" : "warning"}>{log.level}</Badge>
                        </h4> 
                      </td>
                      <td> { log.message } </td>
                      <td>
                        <span> Non renseigné </span>
                      </td>
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
