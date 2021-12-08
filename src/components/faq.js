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
import '../css/faq.css'

export default function Faq() {
    const [selected, setSelected] = useState();
    return (
        <div id="articleWrap">
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
                    <Col md={8} xs={12}>
                        <div className="mb-4">
                            <h2 className="bold">
                                General
                            </h2>
                            <br />
                            <div className="mb-4">
                                <h5 className="bold">
                                    Can I apply for a student visa if I apply for a language program?
                                </h5>
                                It's always best to check with the program organizers, but if it is an annual course organized by a university, 
                                chances are that you can. For courses under 3 months, you may not even need a visa, depending on your passport.
                            </div>
                            <div className="mb-4">
                                <h5 className="bold">
                                    What degrees exist in Portugal? What's is a licenciatura?
                                </h5>
                                <span>
                                    There are several types of Degrees in Portugal. Of the main types, there are:
                                    <ul>
                                        <li>
                                            <span className="italic bold"> 
                                                Licienciaturas (1st Cycle) 
                                            </span> - 
                                            This is the first degree you will typically obtain in Portugal. 
                                            Also known a Bachelor's degree outside of Portugal, most licenciaturas take 3 years.
                                        </li>
                                        <li>
                                            <span className="italic bold"> 
                                                Mestrado (2nd Cycle) 
                                            </span> - 
                                            Mestrados, aka Master's degrees, are the second degree you will obtain, and typically take 2 years.
                                        </li>
                                        <li>
                                            <span className="italic bold"> 
                                                Doutoramento (3rd Cycle) 
                                            </span> - 
                                            Doutoramentos, are also known as Doctorates or PHd's. They typically take 3-4 years in Portugal.
                                        </li>
                                    </ul>
                                    There are also two other, less common degrees:
                                    <ul>
                                        <li>
                                            <span className="italic bold"> 
                                                TeSP, Curso Técnico Superior Profissional (Short Cycle) 
                                            </span> - This is a diploma only offered by polytechnics, and typically only takes 2 years.
                                        </li>
                                        <li>
                                            <span className="italic bold"> 
                                                Mestrado Integrado (1st and 2nd Cycle) 
                                            </span> - This is an integrated masters, which is both a Master's and a Bachelor's. It usually taked 5 years to complete. 
                                        </li>
                                    </ul>
                                    <Twemoji options={{ className: 'twemoji' }}> 
                                        🇺🇸: Associates Degrees don't exist in Portugal
                                    </Twemoji>
                                    <br />
                                    <a 
                                        href="https://www.study-research.pt/en/study/degrees-and-diplomas/" 
                                        className="text-decoration-none"
                                        target="_blank"
                                    > 
                                        More information 
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div id="americans" className="my-5">
                            <h2 className="bold">
                                American Q&A
                            </h2>
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
                            <h2 className="bold">
                                Portuguese Descendents
                            </h2>
                            <p className="text-muted"> 
                                Those with a parent or grandparent with Portuguese citizenship.
                            </p>
                            <br />
                            <div className="mb-4">
                                <h5 className="bold">
                                    Can I apply to a university as a foreigner?
                                </h5>
                                No. Portuguese descendents, whether they have citizenship or not, must go through the National Competition.
                                <br /><br />
                                <Twemoji options={{ className: 'twemoji' }}> 
                                    🇺🇸: As of 2021, if you've graduated prior to 2019, you cannot enter a Portuguese university. 
                                    Portugal requires the now discontinued SAT Subject tests (Not the standard SAT) 
                                    for American Portuguese descendents. Exceptions to this rule only exist for those that have graduated 
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
                                <br /> <br />
                                <a href="https://www.dges.gov.pt/en/pagina/general-information-national-call" target="_blank" className="text-decoration-none"> Find more details here</a>
                            </div>
                            <h5 className="bold">
                                How can I apply to the National Competition for Higher Education as a Portuguese descendent?
                            </h5>
                        </div>
                    </Col>
                    <Col md={4} xs={12}></Col>
                    <br />
                </Row>
            </Container>
        </div>
    )
}