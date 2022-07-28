import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import Datetime from "react-datetime";
import { useToasts } from 'react-toast-notifications';
import "react-datetime/css/react-datetime.css";
import AutoCompletionInput from "../../components/autocompletion/AutoCompletionInput";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner
} from "reactstrap";
import moment from 'moment'

const NewFailure = () => {

  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts()
  
  const [loading, setLoading] = useState(false);
  const [tractors, setTractors] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    $api.tractorService.getAll().then((response) => {
      const customTractors = response.data.map((tr) => ({
        value: tr.tractor.id,
        label: `${tr.tractor.id} - ${tr.user.firstName} ${tr.user.lastName}`,
      }));
      customTractors && setTractors(customTractors);
    }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Liste tracteurs', message }), { appearance: 'error', autoDismiss: true })
      });

    $api.userService.getAll().then(response => {
      const customUsers = response.data.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName} : ${user.phone}`}))
      customUsers && setUsers(customUsers)
    }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Liste utilisateurs', message }), { appearance: 'error', autoDismiss: true })
      })

    $api.mechanicalService.getAll().then(response => {
      // console.log(response)
    }).catch(err => {
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Liste mecaniciens', message }), { appearance: 'error', autoDismiss: true })
      })
 
  }, [$api.mechanicalService, $api.tractorService, $api.userService, $message, addToast]);


  function interventionReducer(state, { type, value }) {
    switch (type) {
      case 'setTractor':
        return { ...state, tractor: value };
      case 'setMecanical':
        return { ...state, mechanical: value };
      case 'setDate': 
        return { ...state, date: value };
      case 'setDescription':
        return { ...state, description: value };
      default: return { ...state };
    }
  }

  const [interventionData, dispatch] = useReducer(interventionReducer, { tractor: '', date: '', description: '', mechanical: '' })

  function createNewIntervention(e) {
    e.preventDefault();

    setLoading(true)
    $api.interventionService.create({ ...interventionData, tractor: interventionData.tractor.value, mechanical: interventionData.mechanical.value, date: moment(interventionData.date).unix() })
      .then(res => {
        dispatch({ type: 'setDate', value: '' })
        dispatch({ type: 'setDescription', value: '' })
        dispatch({ type: 'setTractor', value: '' })
        dispatch({ type: 'setMecanical', value: '' })
        addToast($message({ header: "Ajout Intervention", message: "Nouvelle intervention ajoutée avec succès" }), { appearance: 'success', autoDismiss: true })
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Ajout Intervention', message }), { appearance: 'error', autoDismiss: true })
      })
  }

  return (
    <div className="">
      {/*--------------------------------------------------------------------------------*/}
      {/*--------------------------- Start Inner Div ------------------------------------*/}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi-plus mr-2"></i>
              <span>Ajouter une nouvelle intervention</span>
            </CardTitle>

            <Form onSubmit={createNewIntervention} id="addNewTractor">
              <CardBody>
                <Row>
                  <AutoCompletionInput
                    md="6"
                    suggestions={tractors}
                    label="Tracteur"
                    name="tractor"
                    onChange={(e) => dispatch({type: 'setTractor', value: e })}
                    value={interventionData.tractor}
                  />
                  <Col md="6">
                    <FormGroup>
                      <Label>Date</Label>
                      <Datetime
                        onChange={(e) => dispatch({ type: 'setDate', value: e })}
                        locale="en-gb"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Date d'enregistrement de la panne",
                          name: "date"
                        }}
                        value={interventionData.date}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <Label>Description</Label>
                      <Input type="textarea" name="tractorType" bsSize="lg" onChange={ (e) => dispatch({ type: 'setDescription', value: e.target.value}) } placeholder="Description de l'intervention" value={interventionData.description} />
                    </FormGroup>
                  </Col>
                  <AutoCompletionInput
                    md="6"
                    suggestions={users}
                    label="Mecanicien"
                    name="mecanical"
                    onChange={(e) => dispatch({type: 'setMecanical', value: e })}
                    value={interventionData.mechanical}
                  />
                </Row>
              </CardBody>

              <CardBody className="border-top">
                <Button type="submit" className="btn btn-success" disabled={!interventionData.tractor || !interventionData.mechanical || !interventionData.date || !interventionData.description }>
                  {" "}
                  <i className="fa fa-check"></i> Enregistrer
                  { loading && <Spinner size="sm" color="light" className="ml-2" />}
                </Button>
              </CardBody>
            </Form>
          </Card>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default NewFailure;
