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
                        <a href="#americans">
                            <button type="button" class="btn btn-light mx-2 border">
                                <Twemoji options={{ className: 'twemoji' }}>
                                    🇺🇸 Questions
                                </Twemoji>
                            </button>
                        </a>
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
                        <div id="americans" className="my-5">
                            <h4 className="bold">
                                American Q&A
                            </h4>
                            <br />
                            <div className="mb-4">
                                <h5 className="bold">
                                    Which Portuguese universities are FAFSA eligible?
                                </h5>
                                <a href="https://www.study.eu/article/fafsa-eligible-universities-colleges-in-europe" className="text-decoration-none" target="_blank">
                                    Unfortunately, no Portuguese universities or polytechnics are currently FAFSA eligible.
                                </a>
                            </div>
                            <div className="mb-4">
                                <h5 className="bold">
                                    Can I defer my current public student loans while studying in Portugal?
                                </h5>
                                <a href="https://www.study.eu/article/fafsa-eligible-universities-colleges-in-europe" className="text-decoration-none" target="_blank">
                                    No, no university in Portugal is eligable for deferment.
                                </a>
                            </div>
                        </div>
                        <div id="descendents" className="my-5">
                            <h4 className="bold">
                                Portuguese Descendents
                            </h4>
                            <p className="text-muted"> 
                                Those with a parent or grandparent with Portuguese citizenship.
                            </p>
                            <br />
                            <div className="mb-4">
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
                            <div className="mb-4">
                                <h5 className="bold">
                                    What is the National Competition for Higher Education?
                                </h5>
                                The National Competition for Higher Education, aka Concurso Nacional de Acesso ao Ensino Superior (CNAES) 
                                or the National Contest for Access and Admission to Higher Education, is a "contest" all Portuguese students, and
                                Portuguese emigrants and their families must apply to to enter a public university or polytechnic. 
                                <br /><br />
                                There are special vacancy quotas for students of different backgrounds such as students from the autonomous regions, and for emigrants with different
                                admission requirements.
                            </div>
                            <h5 className="bold">
                                How can I apply to the National Competition for Higher Education as a Portuguese descendent?
                            </h5>
                        </div>
                    </Col>
                    <Col></Col>
                    <br />
                </Row>
            </Container>
        </div>
    )
}