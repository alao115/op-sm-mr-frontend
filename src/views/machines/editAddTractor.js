import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Row, Col, Button, } from "reactstrap";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { CustomCheckbox, CustomRadio, CustomSelect, CustomTextInput } from '../../components/forms/customInputs'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'

export default function BasicForm(props) {
  const params = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [getDepart, setDepart] = useState("");
  const [equipementsTracteursObj, setEquipementsTracteursObj] = useState({});
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts();
  const [existingTractorData, setExistingTractorData] = useState({ ...state.tractor, ...state.tractor.user, phone: Array.isArray(state.tractor.user.phone) ? state.tractor.user.phone.join(',') : state.tractor.user.phone, id: state.tractor.id, type: state.tractor.type.toString() })

  const [equipementsTracteurs, ] = useState([
    { label: "Herse", name: "herse" },
    { label: "Moissonneuse batteuse", name: "moissonneuseBatteuse" },
    { label: "Rotavateur", name: "rotavator" },
    { label: "Semoir", name: "semoir" },
    { label: "Chisel", name: "chisel" },
    { label: "Charrue", name: "charrue" },
    { label: "Remorque", name: "remorque" },
    { label: "Epandeur d'engrais", name: "epandeurdengrais" },
    { label: "Fraise", name: "fraise" },
    { label: "Tarriére", name: "tarriere" },
    { label: "Buteuse", name: "buteuse" },
    { label: "Avez-vous des mécaniciens?", name: "mechanicAvailability" },
    {
      label: "Avez-vous un tractoriste pour votre tracteur?",
      name: "presenceTractorist",
    },
  ]);

  const departments = useMemo(() =>({
    Alibori: [
      "",
      "Banikoara",
      "Gogounou",
      "Kandi",
      "Karimama",
      "Malanville",
      "Ségbana",
    ],
    Atacora: [
      "",
      "Boukoumbé",
      "Cobly",
      "Kérou",
      "Kouandé",
      "Matéri",
      "Natitingou",
      "Péhunco",
      "Tanguiéta",
      "Toucountouna",
    ],
    Atlantique: [
      "",
      "Abomey-Calavi",
      "Allada",
      "Kpomassè",
      "Ouidah",
      "So-Ava",
      "Toffo",
      "Tori-Bossito",
      "Zè",
    ],
    Borgou: [
      "",
      "Bembéréké",
      "N'Dali",
      "Nikki",
      "Parakou",
      "Pèrèrè",
      "Sinendé",
      "Tchaourou",
    ],
    Collines: ["", "Bantè", "Dassa-Zoumè", "Glazoué", "Ouèssè", "Savalou", "Savè"],
    Donga: ["", "Bassila", "Copargo", "Djougou", "Ouaké"],
    Littoral: ["", "Cotonou"],
    Mono: ["", "Athiémé", "Bopa", "Comè", "Grand-Popo", "Houéyogbé", "Lokossa"],
    Ouémé: [
      "",
      "Adjarra",
      "Adjohoun",
      "Aguégués",
      "Akpro-Missérété",
      "Avrankou",
      "Porto-Novo",
      "Sèmè-Kpodji",
    ],
    Plateau: [
      "",
      "Adja-Ouèrè",
      "Ifangni",
      "Kétou",
      "Pobè",
      "Bonou",
      "Dangbo",
      "Sakété",
    ],
    Zou: [
      "",
      "Abomey",
      "Agbangnizoun",
      "Bohicon",
      "Covè",
      "Djidja",
      "Ouinhi",
      "Zangnanado",
      "Za-Kpota",
      "Zogbodomey",
    ],
  }), []);

  useEffect(() => {
    Object.keys(departments).forEach(key => {
      const cityFound = departments[key].find(value => value.toLowerCase() === existingTractorData.user.address.toLowerCase())
      if (cityFound) {
        setExistingTractorData( prev => ({ ...prev, department: key, town: prev.user.address }))
        setDepart(key)
      } else {
        setExistingTractorData( prev => ({ ...prev, department: 'Atlantique', town: 'Ouidah' }))
        setDepart('Atlantique')
      }
    })

    const obj = {}
    equipementsTracteurs.forEach(e => {
      obj[e.name] = false
    })
    setEquipementsTracteursObj({ ...obj})
  }, [departments, equipementsTracteurs, existingTractorData.user.address, navigate, state.tractor])

 
  return (
    <div>
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi-pencil mr-2"></i>
              <span>Modifier un tracteur</span>
            </CardTitle>

            { existingTractorData.department && <Formik 
              initialValues={{ firstName: '', lastName: '', department: '', town: '', phone: '', numChassis: existingTractorData.id, type: '', tractorMark: '',  ...equipementsTracteursObj, ...existingTractorData }}
              validationSchema={ Yup.object({
                firstName: Yup.string().required('Nom est obligatoire'),
                lastName: Yup.string().required('Prénom est obligatoire'),
                // department: Yup.string().required('Départment est obligatoire'),
                // town: Yup.string().required('Ville est obligatoire'),
                phone: Yup.string().matches(/((\b\d{8}\b)(,\s*)?)$1*/g, 'Téléphone invalide').required('Téléphone est obligatoire'),
                numChassis: Yup.string().required("Numéro chassis est obligatoire"),
                tractorMark: Yup.string().required("Marque machine est obligatoire"),
                type: Yup.string().required("Type machine est obligatoire")
              })}
              onSubmit={(values, actions) => {
                // console.log(values)
                const tractorData = {
                  ...values,
                  address: `${values.department}, ${values.town}`
                }
                delete tractorData.user
                delete tractorData.firstName
                delete tractorData.lastName
                delete tractorData.phone
                // delete tractorData.department
                // delete tractorData.town
                delete tractorData._id

                const userData = {
                  id: state.tractor.user.id,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  phone: values.phone.split(','),
                  address: `${values.department}, ${values.town}`
                }

                // console.log(tractorData, userData)

                $api.tractorService
                  .update(tractorData.id, { tractorData, userData })
                  .then((response) => {
                    addToast(
                      $message({
                        header: "Modification tracteur",
                        message: "Tracteur modifie avec succes",
                      }),
                      { appearance: "success", autoDismiss: true }
                    );
                    navigate('/tracteurs')
                  })
                  .catch((error) => {
                    addToast(
                      $message({
                        header: "Modification tracteur",
                        message: "Une erreur s'est produite. Veuillez reessayer",
                      }),
                      { appearance: "error", autoDismiss: true }
                    );
                  });
                actions.setSubmitting(false)
              }}
            >
              <Form>
                <CardBody className="bg-slate-200 mt-3">
                  <CardTitle className="mb-0">
                    Informations du proprietaire
                  </CardTitle>
                </CardBody>
                <CardBody className='space-y-4'>
                  <Row>
                    <Col md="6">
                      <CustomTextInput label="Nom" type="text" placeholder="John" bsSize="lg" name="firstName" />
                    </Col>
                    <Col md="6">
                      <CustomTextInput label="Prénoms" type="text" placeholder="Doe" bsSize="lg" name="lastName" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <CustomSelect label="Département" type="select" name="department" bsSize="lg"changeHandler={(event) => setDepart(event.target.value)}>
                        <option>Selectionner un department</option>
                          {Object.keys(departments).map((department) => (
                            <option value={department} key={department}>
                              {department}
                            </option> 
                          ))}
                      </CustomSelect>
                    </Col>
                    <Col md="6">
                      <CustomSelect label="Ville" type="select" name="town" bsSize="lg" disabled={!getDepart}>
                        { departments[getDepart] &&
                          departments[getDepart].map((town) => (
                            <option value={town} key={town}>
                              {town}
                            </option>
                        ))}
                      </CustomSelect>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <CustomTextInput label="Téléphone" type="tel" placeholder="Tel: 00005566" bsSize="lg" name="phone" minLength="8" />
                    </Col>
                  </Row>
                </CardBody>
                <CardBody className="bg-slate-200 ">
                  <CardTitle className="mb-0">Informations du tracteur</CardTitle>
                </CardBody>
                <CardBody>
                  <Row className='space-y-4'>
                    <Col md="12">
                      <CustomTextInput label="Numéro Chassis" type="text" placeholder="MZGKAOAH0000Z" bsSize="lg" name="numChassis" />
                    </Col>
                    <Col md="6">
                      <CustomSelect label="Marque" type="select" name="tractorMark" bsSize="lg">
                        <option value="mahindra">MAHINDRA</option>
                      </CustomSelect>
                    </Col>
                    <Col md="6">
                      <CustomSelect label="Puissance" type="select" name="tractorType" placeholder="Puissance" bsSize="lg">
                        <option value="90">90 Cheveaux</option>
                      </CustomSelect>
                    </Col>
                    <Col md="6">
                      <CustomRadio title="Type de machine" name="type" children={[{ label: 'Tracteur', value: '1' }, { label: 'Motoculteur', value: '2' }]} />
                    </Col>
                  </Row>
                </CardBody>
                <CardBody className="bg-slate-200">
                  <CardTitle className="mb-0">Equipements du tracteur</CardTitle>
                </CardBody>
                <CardBody>
                  <Row className="-mx-2">
                    <div className="grid grid-cols-3 grid-rows-4">
                      {equipementsTracteurs.map((el, index) => (
                        <CustomCheckbox type="checkbox" name={el.name} key={index} >{el.label}</CustomCheckbox>
                      ))}
                    </div>
                  </Row>
                </CardBody>
                <CardBody className="border-top">
                  <Button type="submit" className="btn btn-success">
                    {" "}
                    <i className="fa fa-check"></i> Enregistrer
                  </Button>
                </CardBody>
              </Form>
            </Formik>}
          </Card>
        </Col>
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
}

// export default BasicForm;
