import React, { useState /* useReducer */ } from "react";

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
  FormText,
  Button,
} from "reactstrap";

import CustomSelect from "../../components/Select/Select";

import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";

export default function BasicForm(props) {
  console.log("Inside here");
  const [getDepart, setDepart] = useState("");
  const [errors, setErrors] = useState({});
  const { $api, $message } = useSelector((state) => state);
  const { addToast } = useToasts();

  const [equipementsTracteurs, setEq] = useState([
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

  // function tractorReducer(state, { type, value }) {
  //   switch (type) {
  //     case 'setFirstname':
  //       return { ...state, firstName: value }
  //     case 'setlastname':
  //       return { ...state, lastName: value }
  //     case 'setDep':
  //       return { ...state, department: value }
  //     case 'setTown':
  //       return { ...state, town: value }
  //     case 'setPhone':
  //       return { ...state, phone: value }
  //     case 'setNChassis':
  //       return { ...state, numChassis: value }
  //     case 'setTractorMark':
  //       return { ...state, tractorMark: value }
  //     case 'setTractorType':
  //       return { ...state, tractorType: value }
  //     case 'setType':
  //       return { ...state, type: value }
  //     case 'setHerse':
  //       return { ...state, herse: value }
  //     case 'setMBatteuse':
  //       return { ...state, moissonneuseBatteuse: value }
  //     case 'setChisel':
  //       return { ...state, chisel: value }
  //     case 'setFraise':
  //       return { ...state, fraise: value }
  //     case 'setCharrue':
  //       return { ...state, charrue: value }
  //     case 'setTarriere':
  //       return { ...state, tarriere: value }
  //     case 'setRotavator':
  //       return { ...state, rotavator: value }
  //     case 'setRemorque':
  //       return { ...state, remorque: value }
  //     case 'setButeuse':
  //       return { ...state, buteuse: value }
  //     case 'setSemoir':
  //       return { ...state, semoir: value }
  //     case 'setEEngrais':
  //       return { ...state, epandeurdengrais: value }
  //     case 'setMechAvailability':
  //       return { ...state, mechanicAvailability: value }
  //     case 'setPTractorist':
  //       return { ...state, presenceTractorist: value }
  //     default: return { ...state }
  //   }
  // }

  // const [tractorData, dispatch] = useReducer(tractorReducer, { buteuse: false, charrue: false, chisel: false, department: "", epandeurdengrais: false, firstName: "", fraise: false, herse: false, lastName: "", mechanicAvailability: false, moissonneuseBatteuse: false, numChassis: "", phone: "", presenceTractorist: false, remorque: false, rotavator: false, semoir: false, tarriere: false, town: "", tractorMark: "", tractorType: "", type: "", _id: "" })

  function createNewTractor(e) {
    e.preventDefault();
    const inputs = Array.from(
      document.querySelectorAll(
        "#addNewTractor input, #addNewTractor select, #addNewTractor"
      )
    ).slice(1);

    const data = {};
    let errors = {};

    inputs.forEach((input) => {
      if (input.name === "type") {
        if (input.checked) data[input.name] = input.value;
      } else {
        data[input.name] =
          input.type === "checkbox" ? input.checked : input.value;
      }

      if (!input.value) errors[input.name] = true;
      if (input.type === "radio")
        errors[input.name] = errors[input.name] || input.checked;
    });

    if (
      errors.firstName ||
      errors.lastName ||
      errors.numChassis ||
      errors.phone ||
      errors.town ||
      !errors.type
    ) {
      setErrors(errors);
    } else {
      $api.tractorService
        .create({ ...data, _id: data.numChassis })
        .then((response) => {
          addToast(
            $message({
              header: "Ajout nouveau tracteur",
              message: "Nouveau tracteur ajoute avec succes",
            }),
            { appearance: "success", autoDismiss: true }
          );
          setErrors({});
          inputs.forEach((input) => {
            input.value = "";
          });
        })
        .catch((error) => {
          addToast(
            $message({
              header: "Ajout nouveau tracteur",
              message: "Une erreur s'est produite. Veuillez reessayer",
            }),
            { appearance: "error", autoDismiss: true }
          );
          // console.log(error)
        });
    }
  }

  const departments = {
    Alibori: [
      "Banikoara",
      "Gogounou",
      "Kandi",
      "Karimama",
      "Malanville",
      "Ségbana",
    ],
    Atacora: [
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
      "Bembéréké",
      "N'Dali",
      "Nikki",
      "Parakou",
      "Pèrèrè",
      "Sinendé",
      "Tchaourou",
    ],
    Collines: ["Bantè", "Dassa-Zoumè", "Glazoué", "Ouèssè", "Savalou", "Savè"],
    Donga: ["Bassila", "Copargo", "Djougou", "Ouaké"],
    Littoral: ["Cotonou"],
    Mono: ["Athiémé", "Bopa", "Comè", "Grand-Popo", "Houéyogbé", "Lokossa"],
    Ouémé: [
      "Adjarra",
      "Adjohoun",
      "Aguégués",
      "Akpro-Missérété",
      "Avrankou",
      "Porto-Novo",
      "Sèmè-Kpodji",
    ],
    Plateau: [
      "Adja-Ouèrè",
      "Ifangni",
      "Kétou",
      "Pobè",
      "Bonou",
      "Dangbo",
      "Sakété",
    ],
    Zou: [
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
  };

  // setDepart(departments['Alibori'][0])
  return (
    <div>
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi-plus mr-2"></i>
              <span>Ajouter un nouveau tracteur</span>
            </CardTitle>
            <Form onSubmit={createNewTractor} id="addNewTractor">
              <CardBody className="bg-light mt-3">
                <CardTitle className="mb-0">
                  Informations du proprietaire
                </CardTitle>
              </CardBody>
              <CardBody>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>Nom</Label>
                      <Input
                        type="text"
                        placeholder="John"
                        bsSize="lg"
                        name="firstName"
                      />
                      <span className="text-danger">
                        {errors.firstName && "'Nom' est obligatoire."}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Prénoms</Label>
                      <Input
                        type="text"
                        placeholder="Doe"
                        bsSize="lg"
                        name="lastName"
                      />
                      <span className="text-danger">
                        {errors.lastName && "'Prenom' est obligatoire."}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    {/* <CustomSelect /> */}
                    <FormGroup>
                      <Label>Département</Label>
                      <Input
                        type="select"
                        name="department"
                        bsSize="lg"
                        onChange={(e) => {
                          setDepart(e.target.value);
                        }}
                      >
                        <option>Selectionner un department</option>
                        {Object.keys(departments).map((department) => (
                          <option value={department} key={department}>
                            {department}
                          </option>
                        ))}
                      </Input>
                      <FormText className="muted">
                        Selectionner votre departement
                      </FormText>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Ville</Label>
                      <Input
                        type="select"
                        name="town"
                        bsSize="lg"
                        disabled={!getDepart}
                      >
                        {departments[getDepart] &&
                          departments[getDepart].map((town) => (
                            <option value={town} key={town}>
                              {town}
                            </option>
                          ))}
                      </Input>
                      <span className="text-danger">
                        {errors.town && "'Ville' est obligatoire."}
                      </span>
                      <FormText className="muted">
                        Selectionner votre ville
                      </FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>Téléphone</Label>
                      <Input
                        type="tel"
                        placeholder="Tel: 00005566"
                        bsSize="lg"
                        name="phone"
                        minLength="8"
                      />
                      <span className="text-danger">
                        {errors.phone && "'Telephone' est obligatoire."}
                      </span>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardBody className="bg-light">
                <CardTitle className="mb-0">Informations du tracteur</CardTitle>
              </CardBody>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label>Numero Chassis</Label>
                      <Input
                        type="text"
                        placeholder="MZGKAOAH0000Z"
                        name="numChassis"
                        bsSize="lg"
                      />
                      <span className="text-danger">
                        {errors.numChassis &&
                          "'Numero chassis' est obligatoire."}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Marque</Label>
                      <Input type="select" name="tractorMark" bsSize="lg">
                        <option>MAHINDRA</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Puissance</Label>
                      <Input type="select" name="tractorType" bsSize="lg">
                        <option>90 Cheveaux</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <span>Type de machine</span>
                    <FormGroup check className="flex">
                      <Label check for="exampleCustomRadio3">
                        Tracteur
                      </Label>
                      <Input
                        type="radio"
                        id="exampleCustomRadio3"
                        name="type"
                        label="Tracteur"
                        value="1"
                      />
                    </FormGroup>
                    <FormGroup check className="flex flex-col">
                      <Label check for="exampleCustomRadio4">
                        Motoculteur
                      </Label>
                      <Input
                        type="radio"
                        id="exampleCustomRadio4"
                        name="type"
                        label="Motoculteur"
                        value="2"
                      />
                    </FormGroup>
                    <span className="text-danger">
                      {errors.type === false && "'Type' est obligatoire."}
                    </span>
                  </Col>
                </Row>
              </CardBody>
              <CardBody className="bg-light">
                <CardTitle className="mb-0">Equipements du tracteur</CardTitle>
              </CardBody>
              <CardBody>
                <FormGroup check>
                  <Row>
                    <div className="grid grid-cols-3 grid-rows-4">
                      {equipementsTracteurs.map((el, index) => (
                        <FormGroup check key={index}>
                          <Label check>
                            <Input id={index} type="checkbox" name={el.name} />
                            {el.label}
                          </Label>
                        </FormGroup>
                      ))}
                    </div>
                  </Row>
                </FormGroup>
              </CardBody>
              <CardBody className="border-top">
                <Button type="submit" className="btn btn-success">
                  {" "}
                  <i className="fa fa-check"></i> Enregistrer
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
}

// export default BasicForm;
