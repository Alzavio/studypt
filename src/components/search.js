import React, { useState, useEffect } from "react";
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
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Search() {
    const [loading, setLoading] = useState(0);
    const [language, setLanguage] = useState("Any");
    const [citizenship, setCitizenship] = useState(localStorage.getItem('citizenship'));
    const [descent, setDescent] = useState(localStorage.getItem('descent'));
    const [results, setResults] = useState(useStore(state => state.results));
    const [searchQuery, setSearchQuery] = useState(useStore(state => state.search));

    // For if the user refreshes, data is recovered from localstorage
    useEffect(() => { 
        console.log(results);
        // this will probably erase the other value if only one is "missing"
        // learn to fix
        if (!results.length) {
            setResults(JSON.parse(localStorage.getItem('searchResults')));
            useStore.setState({ results: JSON.parse(localStorage.getItem('searchResults'))});
        }
        if (searchQuery == "" || searchQuery == null) {
            setSearchQuery(localStorage.getItem('searchQuery'));
            useStore.setState({ search: localStorage.getItem('searchQuery')});
        }
    }, []);

    // On submit
    const requestData = function (e) {
        setLoading(1);
        e.preventDefault();
    }

    // useEffect used to prevent spamming enter, wasting server resources
    useEffect(() => { 
        if (loading == 1) {
            axios.get('https://api.studyportugal.pt/search.php', {
                params: {
                    search: searchQuery,
                    citizenship: citizenship,
                    descent: descent
                }
            }).then(function (response) {
                if (response.data.success) {
                    console.log(response.data.data);
                    localStorage.setItem('citizenship', citizenship);
                    localStorage.setItem('descent', descent);
                    localStorage.setItem('searchQuery', searchQuery);
                    localStorage.setItem('searchResults', JSON.stringify(response.data.data));
                    setResults(response.data.data);
                    useStore.setState({ search: searchQuery, results: response.data.data });
                    setLoading(0);
                }
            }).catch(function (error) {
                // Do something if error
                
            });
        }
    }, [loading]);

    function languageSwitcher(language) {
        console.log(language);
        // filter the .map in the future
        setLanguage(language);
    }

    function citizenshipSwitcher(citizen) {
        setCitizenship(citizen);
        localStorage.setItem('citizenship', citizen);
    }

    function descentSwitcher(descendent) {
        setDescent(descendent);
        localStorage.setItem('descent', descendent);
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <>
            <Helmet>
                <title>Study Portugal - {searchQuery} results </title>
            </Helmet>
            <Navibar />
            <Container>
                <form onSubmit={requestData}>
                    <Row className="mt-nav">
                        <Col xs={3}>
                            <div className="bg-success position-relative" 
                                style={{
                                    marginLeft: '-10px', 
                                    minHeight: citizenship != "Non-EU citizen" ? '295px': '342px'
                                }}
                            >
                                <div className="bg-light position-absolute w-100 px-4 py-3" style={{marginTop: '-10px', marginLeft: '10px'}}> 
                                    <h5 className="pb-1">
                                        Filters
                                    </h5>
                                    <div className="mb-2">
                                        Citizenship
                                    </div>
                                    <select class="form-select mb-2" aria-label="Whether relative of EU member" value={citizenship} onChange={e => citizenshipSwitcher(e.target.value)}>
                                        <option>Non-EU citizen</option>
                                        <option>CPLP citizen</option>
                                        <option>EU citizen</option>
                                    </select>
                                    { citizenship == "Non-EU citizen" &&
                                        <select class="form-select" aria-label="Whether relative of EU member" value={descent} onChange={e => descentSwitcher(e.target.value)}>
                                            <option value={0}>Non-relative of EU member</option>
                                            <option value={1}>Relative of EU member</option>
                                        </select>
                                    }
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
                                        <option>Any</option>
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
                                    onChange={e => setSearchQuery(e.target.value)}
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



                            {results &&
                                results.map((results) =>
                                <Card className="shadow-sm p-2 mb-2">
                                    <Row className="mx-1">
                                        <div className="p-2 rounded d-flex" style={{width:'inherit'}}>
                                            <div style={{minWidth:'7rem', backgroundImage:`url("${results.picture}")`, backgroundSize:'cover', backgroundPosition: 'center', aspectRatio: '1 / 1'}} className="rounded border shadow-sm">

                                            </div>
                                        </div>
                                        <Col className="mt-2" xs={7}>
                                            <h5>{results.degree} {results.programName.replace('Degree', '')} </h5>
                                            {results.universitiesName}
                                            <p className="text-muted">
                                                {capitalizeFirstLetter(results.city)}
                                            </p>
                                            <div className="d-flex mb-2">
                                                <div className="bg-success text-light rounded pointer" onClick={() => languageSwitcher("Portuguese")}>&nbsp;Portuguese&nbsp;</div>
                                                <div className="bg-success text-light rounded mx-2 pointer" onClick={() => languageSwitcher("English")}>&nbsp;English&nbsp;</div>
                                            </div>
                                        </Col>
                                        <Col xs={3} className="p-2">
                                            €{
                                                (descent == 1 || citizenship == "EU citizen") ?
                                                    parseInt(results.tuition).toLocaleString() : (citizenship == "CPLP citizen") ? parseInt(results.CPLPtuition).toLocaleString() : parseInt(results.intTuition).toLocaleString()
                                            } / year
                                            <br />
                                            <span className="text-muted">{parseFloat(results.duration).toLocaleString()} years</span>
                                            <br />
                                            {/*<FontAwesomeIcon icon={faExclamationCircle} flip="horizontal" color="orange"/>*/}
                                            <span className="text-muted"> March 3rd deadline </span>
                                        </Col>
                                    </Row>
                                </Card>
                                )
                            }

                        </Col>
                    </Row>
                </form>
            </Container>
        </>
    );
}