import React, { useState, useEffect, useReducer, useMemo } from "react";
import { useSelector } from "react-redux";
import Datetime from "react-datetime";
import { FormFeedback, InputGroup, InputGroupText } from 'reactstrap'
import "react-datetime/css/react-datetime.css";
import AutoCompletionInput from "../../components/autocompletion/AutoCompletionInput";
import { useToasts } from "react-toast-notifications"
import moment from 'moment'

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
  Spinner,
  Alert
} from "reactstrap";
import useFetchResource from '../../hooks/useFetchResource'

const BasicForm = () => {
  const { addToast } = useToasts()

  const { $api, $message } = useSelector((state) => state);
  
  const [loading, setLoading] = useState(false);
  const [tractors, setTractors] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("")
  const [existingMech, setExistingMech] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isSurnameValid, setIsSurnameValid] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);


  const params = useMemo(() => ({ page: 0, limit: 0  }), [])
  const { resourceData: tractorsData, loadingState: tractorsDataLoading } = useFetchResource({ initialState: { data: [] }, errorHeader: "Liste des tracteurs", resourceService: "tractorService", action: "getAll", params })
  const { resourceData: usersData, loadingState: usersDataLoading } = useFetchResource({ errorHeader: "Liste des mécaniciens", resourceService: "userService", action: "getAll", params })

  useEffect(() => {
    if (!tractorsDataLoading && !tractorsData.data.length) {
    } else {
      const customTractors = tractorsData.data.map((tr) => ({
        value: tr.id,
        label: `${tr.id} - ${tr.user.firstName} ${tr.user.lastName}`,
      }));
      setTractors(customTractors)
    }

    if (!usersDataLoading && !usersData.length) {
    } else {
      const customUsers = usersData.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName} : ${user.phone}`}))
      setUsers(customUsers)
    }
  }, [tractorsData, tractorsDataLoading, usersData, usersDataLoading])

  function maintenanceReducer(state, { type, value }) {
    switch (type) {
      case 'setTractor':
        return { ...state, tractor: value };
      case 'setHM': 
        return { ...state, hmMaintenance: value };
      case 'setDate': 
        return { ...state, date: value };
      case 'setType':
        return { ...state, typeMaintenance: value };
      case 'setHuile':
        return { ...state, typeHuile: value };
      case 'setUser':
        return { ...state, user: value };
      case 'setExistingMech':
        return { ...state, existingMech: value }; 
      case 'setMechName': 
        return { ...state, foreignMechName: value }
      case 'setMechSurname': 
        return { ...state, foreignMechSurname: value }
      case 'setMechPhone': 
        return { ...state, foreignMechPhone: value }
      case 'setReceipt': 
        // console.log(value)
        return { ...state, receipt: value }
      default: return { ...state };
    }
  }

  const [maintenanceData, dispatch] = useReducer(maintenanceReducer, { tractor: '', user: '', date: '', hmMaintenance: '', typeMaintenance: '', typeHuile: '', existingMech: false, foreignMechName: '', foreignMechSurname: '', foreignMechPhone: '', receipt: null})

  function clearMaintenanceData () {
    dispatch({ type: 'setTractor', value: '' })
    dispatch({ type: 'setUser', value: '' })
    dispatch({ type: 'setDate', value: '' })
    dispatch({ type: 'setHM', value: '' })
    dispatch({ type: 'setType', value: '' })
    dispatch({ type: 'setHuile', value: '' })
    dispatch({ type: 'setMechName', value: ''})
    dispatch({ type: 'setMechSurname', value: ''})
    dispatch({ type: 'setMechPhone', value: ''})
  }

  function createNewTractor(e) {
    setError("")
    e.preventDefault();

    // console.log(maintenanceData)
    const formData = new FormData()

    const customData = { ...maintenanceData, tractor: maintenanceData.tractor.value, user: maintenanceData.user.value, date: moment(maintenanceData.date).unix() }

    Object.keys(customData).forEach(key => {
      formData.append(key, customData[key])
    })

    setLoading(true)
    $api.maintenanceService.create(formData)
      .then(res => {
        clearMaintenanceData()
        setLoading(false)
        addToast($message({ header: "Ajout vidange", message: "Nouvelle vidange ajoutée avec succès" }), { appearance: 'success', autoDismiss: true })
      })
      .catch(err => {
        setLoading(false)
        setError(err)
        const message = err?.response?.data.error.message || err.message;
        addToast($message({ header: 'Ajout vidange', message }), { appearance: 'error', autoDismiss: true })
      })
  }

  function validateMechData(field, value) {
    if (field === 'phone') {
      if(/[a-zA-Z]/.test(value)) {
        setIsPhoneValid(true)
      }
      else setIsPhoneValid(false)
    } else {
      if(/\d/.test(value)) {
        if(field === 'name') 
          setIsNameValid(true)
        else
          setIsSurnameValid(true)
      } else {
        if(field === 'name') 
          setIsNameValid(false)
        else
          setIsSurnameValid(false)
      }
    }
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
              <span>Ajouter une nouvelle vidange</span>
            </CardTitle>

            { error && <Alert color="danger">{error.toString()}!</Alert> }
            <Form onSubmit={createNewTractor} id="addNewTractor">
              <CardBody>
                <Row>
                  <AutoCompletionInput
                    md="6"
                    suggestions={tractors}
                    label="Tracteur"
                    name="tractor"
                    onChange={(e) => dispatch({type: 'setTractor', value: e })}
                    value={maintenanceData.tractor}
                    // error="Veuillez selectionner un tracteur"
                  />

                  <Col md="6">
                    <FormGroup>
                      <Label>Heure moteur lors de la vidange</Label>
                      <Input type="number" placeholder="20" name="hmMaintenance" onChange={(e) => dispatch({ type: 'setHM', value: e.target.value })} value={maintenanceData.hmMaintenance}/>
                      {/* <span className="text-danger">{errors.hmMaintenance && 'heure moteur invalide.'}</span> */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Date de la vidange</Label>
                      <Datetime
                        onChange={(e) => dispatch({ type: 'setDate', value: e }) }
                        locale="en-gb"
                        timeFormat={false}
                        inputProps={{
                          placeholder: "Date vidange",
                          name: "date"
                        }}
                        value={maintenanceData.date}
                      />
                    </FormGroup>
                  </Col>

                  <Col md="6">
                    <FormGroup>
                      <Label>Type de maintenance</Label>
                      <Input type="select" name="tractorType" bsSize="lg" onChange={ (e) => dispatch({ type: 'setType', value: e.target.value}) } value={maintenanceData.typeMaintenance}>
                        <option>Selectionner type de maintenance</option>
                        <option value="1">300h</option>
                        <option value="2">600h</option>
                        <option value="3">900h</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Huile utilisée</Label>
                      <Input type="select" name="tractorMark" bsSize="lg" onChange={ (e) => dispatch({ type: 'setHuile', value: e.target.value }) } value={maintenanceData.typeHuile}>
                        <option>Selectionner type huile</option>
                        <option value="MAHINDRA">MAHINDRA</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Televerser la facture scannee</Label>
                      <InputGroup>
                        <InputGroupText>Televerser</InputGroupText>
                        <div className="custom-file">
                          <Input type="file" className="custom-file-input" id="inputGroupFile01" onChange={ (e) => { dispatch({ type: 'setReceipt', value: e.target.files[0]}) }} />
                          <label className="custom-file-label" htmlFor="inputGroupFile01">{ maintenanceData.receipt ? maintenanceData.receipt.name : 'Choississez un fichier'}</label>
                        </div>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                      <div className="form-check form-check-inline d-flex align-items-center">
                        <Input className="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={ (e) => { setExistingMech(e.target.checked); dispatch({ type: 'setExistingMech', value: e.target.checked }) } } />
                        <Label for="inlineCheckbox1" className="mb-0">Mecanicien appartient au reseau de SoNaMA? ({ existingMech ? 'Oui' : 'Non' }) </Label>
                      </div>
                      <>
                        {
                          existingMech ?
                            <AutoCompletionInput
                              className="px-0"
                              onChange={ (e) => dispatch({ type: 'setUser', value: e }) }
                              md="12"
                              suggestions={users}
                              label="Nom et prenom"
                              name="user"
                              value={maintenanceData.user}
                            />
                            :
                            <Row className="mt-2">
                              <Col md="4">
                                <FormGroup>
                                  <Label>Nom</Label>
                                  <Input invalid={isNameValid} type="text" placeholder="Nom du mecanicien" name="foreignMechName" onInput={(e) => validateMechData('name', e.target.value) } onChange={(e) => dispatch({ type: 'setMechName', value: e.target.value })} value={maintenanceData.foreignMechName}/>
                                  <FormFeedback>Nom incorrect</FormFeedback>
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Prenom</Label>
                                  <Input invalid={isSurnameValid} type="text" placeholder="prenom du mecanicien" name="foreignMechSurname" onInput={(e) => validateMechData('surname', e.target.value)} onChange={(e) => dispatch({ type: 'setMechSurname', value: e.target.value })} value={maintenanceData.foreignMechSurname}/>
                                  <FormFeedback>Prénom incorrect</FormFeedback>
                                </FormGroup>
                              </Col>
                              <Col md="4">
                                <FormGroup>
                                  <Label>Contact</Label>
                                  <Input invalid={isPhoneValid} onInput={ (e) => validateMechData('phone', e.target.value) } type="tel" placeholder="Contact du mecanicien" name="foreignMechPhone" onChange={(e) => dispatch({ type: 'setMechPhone', value: e.target.value })} value={maintenanceData.foreignMechPhone}/>
                                  <FormFeedback>Numéro de téléphone incorrect</FormFeedback>
                                </FormGroup>
                              </Col>          
                            </Row>
                        }
                      </>
                  </Col>
                </Row>
              </CardBody>

              <CardBody className="border-top">
                <Button type="submit" className="btn btn-success" disabled={!maintenanceData.tractor || !maintenanceData.date || !maintenanceData.typeMaintenance || !maintenanceData.typeHuile || (maintenanceData.existingMech ? !maintenanceData.user : (!maintenanceData.foreignMechName || !maintenanceData.foreignMechSurname || !maintenanceData.foreignMechPhone) ) }>
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

export default BasicForm;
