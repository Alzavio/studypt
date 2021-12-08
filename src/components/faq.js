import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { 
    Row,
    Col,
    Container,
    Button
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navibar from "./microComponents/navbar"; 
import Twemoji from 'react-twemoji';
import '../css/global.css';
import { ReactSVG } from 'react-svg'

export default function Faq() {
    const [selected, setSelected] = useState();
    return (
        <div>
            <Helmet>
                <title>Study in Portugal - FAQ</title>
            </Helmet>
            <Navibar />
            <Container className="mt-nav">

                        <h1 className="bold">
                            FAQ
                        </h1>
                        <div className="d-flex">
                            <button type="button" class="btn btn-light border">
                                <Twemoji options={{ className: 'twemoji' }}>
                                    🇪🇺 Questions
                                </Twemoji>
                            </button>
                            <button type="button" class="btn btn-light mx-2 border">
                                <Twemoji options={{ className: 'twemoji' }}>
                                    🇺🇸 Questions
                                </Twemoji>
                            </button>
                            <button type="button" class="btn btn-light border">
                                <Twemoji options={{ className: 'twemoji' }}>
                                    🇵🇹 Descendents
                                </Twemoji>
                            </button>
                            <button type="button" class="btn btn-light border mx-2">
                                <div className="d-flex">
                                    CPLP Members
                                </div>
                            </button>
                        </div>
                <Row>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}