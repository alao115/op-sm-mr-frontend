import React from 'react';
import { Row, Col } from 'reactstrap';

import {
    Earnings,
    EarningsOverview,
    Products,
    Sales,
    Orders,
    Reviews
}
    from '../../components/dashboard/';

const Ecommerce = () => {
    return (
        <div>
            <Row>
                <Col sm={12} lg={4}>
                    <Earnings />
                </Col>
                <Col sm={12} lg={8}>
                    <EarningsOverview />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Products />
                </Col>
            </Row>
            <Row>
                <Col sm={12} lg={8}>
                    <Sales />
                </Col>
                <Col sm={12} lg={4}>
                    <Orders />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Reviews />
                </Col>
            </Row>
        </div>
    );
}

export default Ecommerce;
