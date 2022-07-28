import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { CardTitle, Row, Button, ButtonGroup, CardBody, Spinner, Input } from "reactstrap";
import { useToasts } from 'react-toast-notifications'
import TractorsTable from "../../components/machines/tractorsTable";

export default function TractorByATDA(props) {
  const { $api, $message } = useSelector(state => state)
  const [tractors, setTractors] = useState([]);
  const [currentATDA, setCurrentATDA] = useState(1)
  const [loading, setLoading] = useState(false)
  const [atda, setAtda] = useState(1)
  const [search, setSearch] = useState('')  
  const [filterTractors, setFilterTractors] = useState([])
  const { addToast } = useToasts()


  useEffect(() => {
    setLoading(true)
    $api.tractorService.getAllByAtda(atda).then((response) => {
      // setTractors((response.data || []));
      response.data && setTractors(response.data);
    }).catch(err =>  addToast($message({ header: 'Liste tracteurs par ATDA', message: "Une erreur s'est produite. Veuillez reessayer." }), { appearance: "error", autoDismiss: true }))
      .finally(() => setLoading(false));
  }, [atda, $api, $message, addToast]);

  useEffect(() => {
    let results = []
    if(search) {
      results = tractors.filter(tractor => `${tractor.user.firstName} ${tractor.user.lastName}`.toLowerCase().trim().includes(search.toLowerCase().trim()) || tractor.tractor.id.toLowerCase().includes(search.toLowerCase().trim()) || tractor.user.phone.toLowerCase().includes(search.toLowerCase().trim()) )
    } else results = tractors
    setFilterTractors(results)
  }, [search, tractors])

  return (
    <>
      <TractorsTable tractors={filterTractors} title="Liste des tracteurs par ATDA">

        <CardBody>
          <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Entrez le nom ou numéro chassis pour rechercher" />
        </CardBody>
        {
          !loading ?
          <CardTitle className="bg-light border-bottom p-3 mb-0">
            <Row className="justify-content-between px-4">
              <h2>Liste des tracteurs par ATDA</h2>
              <ButtonGroup className="align-items-center">
                <span className='mr-4'>ATDA N<sup>o</sup>: </span>
                {[1, 2, 3, 4, 5, 6, 7].map((atda) => (
                  <Button className="btn" outline={ currentATDA !== atda } color="secondary" key={atda} onClick={(e) => { setAtda(atda); setCurrentATDA(atda) } }>
                    {atda}
                  </Button>
                ))}
              </ButtonGroup>
            </Row>
          </CardTitle> :
          <>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <Row className="justify-content-between px-4">
                <h2>Liste des tracteurs par ATDA</h2>
                <ButtonGroup className="align-items-center">
                  <span className='mr-4'>ATDA N<sup>o</sup>: </span>
                  {[1, 2, 3, 4, 5, 6, 7].map((atda) => (
                    <Button className="btn" outline={ currentATDA !== atda } color="secondary" key={atda} onClick={(e) => { setAtda(atda); setCurrentATDA(atda) }}>
                      {atda}
                    </Button>
                  ))}
                </ButtonGroup>
              </Row>
            </CardTitle>
            <CardBody className="text-center">
              <h4>Chargement...</h4>
              <Spinner style={{ width: '3rem', height: '3rem' }} />
            </CardBody>
          </> 
        }
      </TractorsTable>
    </>
  );
};
