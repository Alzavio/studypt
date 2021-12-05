import React, { useState } from "react";
import { 
    Navbar,
    Container, 
    Nav, 
    Card, 
    NavDropdown, 
    Dropdown, 
    Button, 
    InputGroup, 
    FormControl, 
    Row,
    Col,
    Tooltip,
    OverlayTrigger,
    Spinner,
  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../state/searchResults';
import 'font-awesome/css/font-awesome.css';
import Navibar from "./microComponents/navbar";
import '../css/search.css';

export default function Search() {
    const [loading, setLoading] = useState(0);
    const [language, setLanguage] = useState("Any");
    const results = useStore(state => state.results);
    const searchQuery = useStore(state => state.search);
    console.log(results);
    function languageSwitcher(language) {
        console.log(language);
        // filter the .map in the future
        setLanguage(language);
    }
    return (
        <>
            <Navibar />
            <Container>
                <form method="POST">
                    <Row className="mt-nav">
                        <Col xs={3}>
                            <div className="bg-success position-relative" style={{marginLeft: '-10px', minHeight: '342px'}}>
                                <div className="bg-light position-absolute w-100 px-4 py-3" style={{marginTop: '-10px', marginLeft: '10px'}}> 
                                    <h5 className="pb-1">
                                        Filters
                                    </h5>
                                    <div className="mb-2">
                                        Citizenship
                                    </div>
                                    <select class="form-select mb-2" aria-label="Whether relative of EU member">
                                        <option selected>Non-EU citizen</option>
                                        <option selected>CPLP citizen</option>
                                        <option selected>EU citizen</option>
                                    </select>
                                    <select class="form-select" aria-label="Whether relative of EU member">
                                        <option selected>Non-relative of EU member</option>
                                        <option selected>Relative of EU member</option>
                                    </select>
                                    <div className="my-2">
                                        Language
                                    </div>
                                    <select class="form-select" aria-label="Select language" value={language} onChange={e => setLanguage(e.target.value)}>
                                        <option>Any</option>
                                        <option>English</option>
                                        <option>Portuguese</option>
                                        <option>French</option>
                                    </select>
                                    <div className="my-2">
                                        Degree
                                    </div>
                                    <select class="form-select" aria-label="Select degree">
                                        <option>Bachelor's</option>
                                        <option>Master's</option>
                                        <option>PHd</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </Col>
                        <Col xs={9} style={{minHeight: '20rem'}}>
                            <InputGroup className="mb-3 shadow-sm rounded border">
                                <FormControl
                                    placeholder="Search a degree or course..."
                                    aria-label="Search a degree"
                                    aria-describedby="searchbtn"
                                    className="p-2 border-0"
                                    name="search"
                                    value={searchQuery}
                                />
                                <Button variant="secondary" className="border-0 bg-white" type="submit">
                                    { loading ? 
                                    <Spinner animation="border" role="status" style={{color:'grey'}} className="d-flex align-items-center">
                                    <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                    :
                                    <FontAwesomeIcon icon={faSearch} flip="horizontal" color="grey"/>
                                    }
                                </Button>
                            </InputGroup>

                            <Card className="shadow-sm p-2">
                                <Row className="mx-1">
                                    <div className="p-2 rounded d-flex" style={{width:'inherit'}}>
                                        <div style={{minWidth:'7rem', backgroundImage:'url("https://upload.wikimedia.org/wikipedia/commons/5/50/Ual_600px.png")', backgroundSize:'cover', aspectRatio: '1 / 1'}} className="rounded shadow-sm">

                                        </div>
                                    </div>
                                    <Col className="mt-2" xs={7}>
                                        <h5>Bachelor's Degree in Computer Science </h5>
                                        University of Braga
                                        <p className="text-muted">
                                            Braga
                                        </p>
                                        <div className="d-flex mb-2">
                                            <div className="bg-success text-light rounded pointer" onClick={() => languageSwitcher("Portuguese")}>&nbsp;Portuguese&nbsp;</div>
                                            <div className="bg-success text-light rounded mx-2 pointer" onClick={() => languageSwitcher("English")}>&nbsp;English&nbsp;</div>
                                        </div>
                                    </Col>
                                    <Col xs={3} className="p-2">
                                        €2,000 / year
                                        <br />
                                        <span className="text-muted">3 years</span>
                                        <br />
                                        {/*<FontAwesomeIcon icon={faExclamationCircle} flip="horizontal" color="orange"/>*/}
                                        <span className="text-muted"> March 3rd deadline </span>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </form>
            </Container>
        </>
    );
}