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
 
  }, [$api.tractorService, $message, addToast]);


  function failureReducer(state, { type, value }) {
    switch (type) {
      case 'setTractor':
        return { ...state, tractor: value };
      case 'setDate': 
        return { ...state, date: value };
      case 'setDescription':
        return { ...state, description: value };
      default: return { ...state };
    }
  }

  const [failureData, dispatch] = useReducer(failureReducer, { tractor: '', date: '', description: '' })

  function createNewFailure(e) {
    e.preventDefault();

    setLoading(true)
    $api.failureService.create({ ...failureData, tractor: failureData.tractor.value, date: moment(failureData.date).unix() })
      .then(res => {
        dispatch({ type: 'setDate', value: '' })
        dispatch({ type: 'setDescription', value: '' })
        dispatch({ type: 'setTractor', value: '' })
        setLoading(false)
        addToast($message({ header: "Ajout Panne", message: "Nouvelle panne ajoutée avec succès" }), { appearance: 'success', autoDismiss: true })
      })
      .catch(err => {
        setLoading(false)
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Ajout Panne', message }), { appearance: 'error', autoDismiss: true })
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
              <span>Ajouter une nouvelle panne</span>
            </CardTitle>

            <Form onSubmit={createNewFailure} id="addNewTractor">
              <CardBody>
                <Row>
                  <AutoCompletionInput
                    md="6"
                    suggestions={tractors}
                    label="Tracteur"
                    name="tractor"
                    onChange={(e) => dispatch({type: 'setTractor', value: e })}
                    value={failureData.tractor}
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
                        value={failureData.date}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label>Description</Label>
                      <Input type="textarea" name="tractorType" bsSize="lg" onChange={ (e) => dispatch({ type: 'setDescription', value: e.target.value}) } placeholder="Description de la panne" value={failureData.description} />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>

              <CardBody className="border-top">
                <Button type="submit" className="btn btn-success" disabled={!failureData.tractor || !failureData.date || !failureData.description }>
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
