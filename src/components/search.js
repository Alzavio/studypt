import React, { useState, useEffect } from "react";
import { 
    Container, 
    Card, 
    Button, 
    InputGroup, 
    FormControl, 
    Row,
    Col,
    Spinner,
    Collapse
  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faExclamationCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../state/searchResults';
import 'font-awesome/css/font-awesome.css';
import Navibar from "./microComponents/navbar";
import '../css/search.css';
import { Helmet } from "react-helmet";
import axios from "axios";
import '../css/global.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Moment from 'react-moment';


export default function Search() {
    const [loading, setLoading] = useState(0);
    const [language, setLanguage] = useState("Any");
    const [degree, setDegree] = useState("Any");
    const [citizenship, setCitizenship] = useState(localStorage.getItem('citizenship'));
    const [descent, setDescent] = useState(localStorage.getItem('descent'));
    const [results, setResults] = useState(useStore(state => state.results));
    const [imageRetriever, setImageRetriever] = useState(useStore(state => state.images));
    const [searchQuery, setSearchQuery] = useState(useStore(state => state.search));
    const [open, setOpen] = useState(true);
    const [width, setWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    // For if the user refreshes, data is recovered from localstorage
    useEffect(() => { 
        // this will probably erase the other value if only one is "missing"
        // learn to fix
        if (localStorage.getItem('searchResults') == null && localStorage.getItem('searchQuery') == null) {
            navigate('/');
        } else {
            if (!results.length) {
                setResults(JSON.parse(localStorage.getItem('searchResults')));
                useStore.setState({ results: JSON.parse(localStorage.getItem('searchResults'))});
            }
            if (searchQuery == "" || searchQuery == null) {
                setSearchQuery(localStorage.getItem('searchQuery'));
                useStore.setState({ search: localStorage.getItem('searchQuery')});
            }
            if (imageRetriever == "" || imageRetriever == null) {
                setImageRetriever(JSON.parse(localStorage.getItem('imageLibrary')));
                useStore.setState({ images: localStorage.getItem('imageLibrary')});
            }
        }
    }, []);
    // Determining page width
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    useEffect(() => {
        if (width < 768) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [width]);
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
                }
            }).then(function (response) {
                if (response.data.success) {
                    localStorage.setItem('citizenship', citizenship);
                    localStorage.setItem('descent', descent);
                    localStorage.setItem('searchQuery', searchQuery);
                    localStorage.setItem('searchResults', JSON.stringify(response.data.data));
                    localStorage.setItem('imageLibrary', JSON.stringify(response.data.logos));
                    setResults(response.data.data);
                    setImageRetriever(response.data.logos);
                    console.log(response.data.logos);
                    useStore.setState({ search: searchQuery, results: response.data.data, images: response.data.logos });
                    setLoading(0);
                }
            }).catch(function (error) {
                // Do something if error
                
            });
        }
    }, [loading]);

    function languageSwitcher(language) {
        // filter the .map in the future
        setLanguage(language);
    }

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
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
    function imageFinder(uniID) {
        if (Array.isArray(imageRetriever)) {
            let result = imageRetriever.filter(obj => { return obj.id === uniID });
            return result[0]["picture"]
        } else if (imageRetriever != null)  {
            try {
                setImageRetriever(JSON.parse(imageRetriever));
            } catch (e) {
                console.log(e);
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>Study Portugal - {capitalizeFirstLetter(searchQuery)} results </title>
            </Helmet>
            <Navibar homeArea={<Link to="/" className="text-dark text-decoration-none">Home</Link>} />
            <Container>
                <form onSubmit={requestData}>
                    <Row className="mt-nav">
                        <Col md={3} xs={12}>
                            <div className="bg-success position-relative mb-4 w-100" 
                                style={{minHeight:'fit-content', marginTop: '10px', float: 'left', marginLeft: '-5px'}}
                            >
                                <div className="bg-light w-100 px-4 py-3" style={{marginTop: '-10px', marginLeft: '10px', marginBottom: '10px'}}> 
                                    <div className="pb-1" onClick={e => setOpen(!open)} style={{lineHeight:'2.25'}}>
                                        <span className="h5">
                                            Filters
                                        </span> 
                                        { 
                                            (width < 768) ? open ? <FontAwesomeIcon className="mx-2" icon={faChevronUp} />
                                            :
                                            <FontAwesomeIcon className="mx-2" icon={faChevronDown} /> : ""
                                        }
                                    </div>
                                    <Collapse in={open}>
                                        <div>
                                            <div className="mb-2">
                                                Citizenship
                                            </div>
                                            
                                            <select className="form-select mb-2" aria-label="Whether relative of EU member" value={citizenship} onChange={e => citizenshipSwitcher(e.target.value)}>
                                                <option>Non-EU citizen</option>
                                                <option>CPLP citizen</option>
                                                <option>EU citizen</option>
                                            </select>
                                            { citizenship == "Non-EU citizen" &&
                                                <select className="form-select" aria-label="Whether relative of EU member" value={descent} onChange={e => descentSwitcher(e.target.value)}>
                                                    <option value={0}>Non-relative of EU member</option>
                                                    <option value={1}>Relative of EU member</option>
                                                </select>
                                            }
                                            <div className="my-2">
                                                Language
                                            </div>
                                            <select className="form-select" aria-label="Select language" value={language} onChange={e => setLanguage(e.target.value)}>
                                                <option>Any</option>
                                                <option>English</option>
                                                <option>Portuguese</option>
                                                <option>French</option>
                                            </select>
                                            <div className="my-2">
                                                Degree
                                            </div>
                                            <select className="form-select" aria-label="Select degree" value={degree} onChange={e => setDegree(e.target.value)}>
                                                <option>Any</option>
                                                <option>Bachelor's</option>
                                                <option>Master's</option>
                                                <option>PHd</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        </Col>
                        <Col md={9} xs={12} style={{minHeight: '20rem'}}>
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
                                results.filter(tag => language == "Any" ? 
                                                            degree == "Any" ?  1 : tag.degree == degree
                                                        : 
                                                        (JSON.stringify(tag.tags).includes(language) && (degree != "Any" ? tag.degree == degree : 1))
                                              ).map((results) =>
                                <Card className="shadow-sm p-2 mb-2">
                                    <Row className="mx-1">
                                        <div className="p-2 rounded d-flex" style={{width:'inherit'}}>
                                            <Link to={`/${results.universitiesName}/${results.programName.replace("Degree", results.degree)}`}>
                                                <div style={{minWidth:'7rem', backgroundImage:`url("${imageFinder(results.uniID)}")`, backgroundSize:'cover', backgroundPosition: 'center', aspectRatio: '1 / 1'}} className="rounded border shadow-sm">

                                                </div>
                                            </Link>
                                        </div>
                                        <Col className="mt-2" md={7} xs={12}>
                                            <Link to={`/${results.universitiesName}/${results.programName.replace("Degree", results.degree)}`} className="text-decoration-none">
                                                <h5 className="text-dark">{results.degree} {results.programName.replace('Degree', '')} </h5>
                                                <span className="text-dark">{results.universitiesName}</span>
                                                <p className="text-muted">
                                                    {capitalizeFirstLetter(results.city)}
                                                </p>
                                            </Link>
                                            <div className="d-flex mb-2">
                                                {
                                                    results.tags.map((tag) =>
                                                        <div className="bg-success text-light rounded pointer mr-1" onClick={() => languageSwitcher(`${tag.tagName}`)} style={{padding:'.05rem'}}>&nbsp;{tag.tagName}&nbsp;</div>
                                                    )
                                                }
                                            </div>
                                        </Col>
                                        <Col md={3} xs={12} className="p-2">
                                            €{
                                                (descent == 1 || citizenship == "EU citizen") ?
                                                    parseInt(results.tuition).toLocaleString() : (citizenship == "CPLP citizen") ? parseInt(results.CPLPtuition).toLocaleString() : parseInt(results.intTuition).toLocaleString()
                                            } / year
                                            <br />
                                            <span className="text-muted">{parseFloat(results.duration).toLocaleString()} years</span>
                                            <br />
                                            {/*Check if past in future update <FontAwesomeIcon icon={faExclamationCircle} flip="horizontal" color="orange"/>*/}
                                            {/*Account for CPLP in future update*/}
                                            <span className="text-muted"> 
                                                    {
                                                        (descent == 1 || citizenship == "EU citizen") ? 
                                                            results.deadlines.filter(date => date.type == 1 && date.round == 1).length ? 
                                                                <Moment format="MMMM Do YYYY">
                                                                    {results.deadlines.filter(date => date.type == 1 && date.round == 1)[0].deadline}
                                                                </Moment>
                                                                :
                                                                "Unknown"
                                                            :
                                                            results.deadlines.filter(date => date.type == 2 && date.round == 1).length ?
                                                                <Moment format="MMMM Do YYYY">
                                                                    {results.deadlines.filter(date => date.type == 2 && date.round == 1)[0].deadline}
                                                                </Moment>
                                                                :
                                                                "Unknown"
                                                    }
                                            </span>
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
