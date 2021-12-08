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
                            <a href="#descendents">
                                <button type="button" class="btn btn-light border">
                                    <Twemoji options={{ className: 'twemoji' }}>
                                        🇵🇹 Descendents
                                    </Twemoji>
                                </button>
                            </a>
                            <button type="button" class="btn btn-light border mx-2">
                                <div className="d-flex">
                                    CPLP Members
                                </div>
                            </button>
                        </div>
                <Row className="mt-4">
                    <Col>
                        <h4 className="bold">
                            General
                        </h4>
                    
                        <div id="descendents">
                            <h4 className="bold">
                                Portuguese Descendents
                            </h4>
                            <p className="text-muted"> 
                                Those with a parent or grandparent with Portuguese citizenship.
                            </p>
                            <br />
                            <h5 className="bold">
                                Can I apply to a university as a foreigner?
                            </h5>
                            No. EU descendents, whether they have citizenship or not, must go through the National Competition.
                            <br /><br />
                            <Twemoji options={{ className: 'twemoji' }}> 
                                🇺🇸: As of 2021, if you've graduated prior to 2019, you cannot enter a Portuguese university. 
                                Portugal requires the now discontinued SAT Subject tests (Not the standard SAT) 
                                for American EU descendents. Exceptions to this rule only exist for those that have graduated 
                                after 2018. 
                            </Twemoji>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}