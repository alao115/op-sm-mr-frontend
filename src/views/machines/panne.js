import React, { useState, useEffect } from "react";
import { useToasts } from 'react-toast-notifications';

import { CardTitle, CardBody, Input, Card,
  TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Button,
    CardText,
    Row,
    Col
 } from "reactstrap";

import classnames from 'classnames';


const Panne = (props) => {

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
		if (activeTab !== tab) setActiveTab(tab);
  }


  return (
    <>
      <Card className="p-3 mb-12">
        <CardTitle className="flex">
        	<h2>Panne N<sup>o</sup>MZGKAOAH0458M</h2>
        	<h5 className='text-muted font-light'>Nom & Prenom</h5>
				</CardTitle>
        <h5 className="font-light">Tel: +229 63 58 63 58</h5>
        <h5 className="font-light">Adresse: SoNaMA</h5>
      </Card>

      <Card>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>Interventions</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>Maintenances</NavLink>
            </NavItem>
          </Nav>
          <TabContent className="p-4" activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <h4>Tab 1 Contents</h4>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </Card>
    </>
  );
};

export default Panne;
