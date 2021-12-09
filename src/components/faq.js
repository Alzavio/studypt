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
import { ReactSVG } from 'react-svg';
import '../css/global.css';
import '../css/faq.css';

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
                <Row className="mt-4">
                    <Col md={8} xs={12}>
                        <div className="d-md-flex d-sm-block mb-4">
                            <button type="button" class="btn btn-light border mt-2">
                                <Twemoji options={{ className: 'twemoji' }}>
                                    🇪🇺 Questions
                                </Twemoji>
                            </button>
                            <a href="#americans">
                                <button type="button" class="btn btn-light mx-2 border mt-2">
                                    <Twemoji options={{ className: 'twemoji' }}>
                                        🇺🇸 Questions
                                    </Twemoji>
                                </button>
                            </a>
                            <a href="#descendents">
                                <button type="button" class="btn btn-light border mt-2">
                                    <Twemoji options={{ className: 'twemoji' }}>
                                        🇵🇹 Descendents
                                    </Twemoji>
                                </button>
                            </a>
                            <button type="button" class="btn btn-light border mx-2 mt-2">
                                <div className="d-flex">
                                    CPLP Members
                                </div>
                            </button>
                        </div>
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
                            <div className="mb-4">
                                <h5 className="bold">
                                    How can I apply to the National Competition for Higher Education as a Portuguese descendent?
                                </h5>
                                While it might seem that the process for Portuguese descendents is easier due to the available vacancies,
                                the requirements may make it much more difficult than if you were a foreigner. You should plan at least a year or two in advance. 
                                <br /><br />
                                <span className="bold"> First, </span> you must request an equivelancy to your secondary education grades. 
                                This can be requested at your the nearest secondary school in Portugal if you already reside in the country, and may take several months. 
                                The secondary school may a request proof of residence called a "Atestado de residência".
                                <br /><br />
                                <span className="bold">
                                    If you live outside of Portugal, an equivilancy can only be requested by post. 
                                </span>
                                <br /><br />
                                For more information <a href="https://www.dge.mec.pt/faq-equivalence-foreign-qualifications" target="_blank">click here</a>
                                <br /><br />
                                <Twemoji options={{ className: 'twemoji' }}>
                                    🇺🇸: One of the many requirements for proof of completion of High School is your Diploma.
                                    The Portuguese government does not understand that these documents are often purely ceremonial, and usually cannot be replaced.
                                    If you've graduated recently, ask if your High School if they can print a secondary copy, as it may not be returned.
                                </Twemoji>
                                <br /><br />
                                <span className="bold">Second,</span>
                                <br /><br />
                                <a 
                                    href="https://www.dges.gov.pt/pt/pagina/contingente-especial-para-candidatos-emigrantes-portugueses-e-familiares-que-com-eles-residam"
                                    className="text-decoration-none"    
                                    target="_blank"
                                >
                                    Further information on the process can be found here
                                </a> (Available in Portuguese only)
                            </div>
                        </div>
                    </Col>
                    <Col md={4} xs={12}></Col>
                    <br />
                </Row>
            </Container>
        </div>
    )
}