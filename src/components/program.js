import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Row,
    Col,
    Container,
    Card,
    Button,
    Dropdown,
    Collapse,
    Spinner
} from 'react-bootstrap';
import Navibar from "./microComponents/navbar"; 
import '../css/global.css';
import '../css/program.css';
import ReactMapGL, { FlyToInterpolator, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faExternalLinkAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.css';
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';
import { useStore } from '../state/searchResults';

export default function Program() {
    const { university, degree } = useParams();
    const [data, setData] = useState();
    const [languages, setLanguages] = useState("");
    const [dataFetch, setDataFetch] = useState(0);
    const [newUser, setNewUser] = useState(0);
    const [open, setOpen] = useState(false);

    const [values, setValues] = useState({
        programName: degree, 
        uniName: university,
        tuition: "",
        languages: "",
        link: "",
        years: "",
        startDate: "",
        pic: "",
        deadlines: {},
        coords: {lat: 37.78, lon: -22.41},
    });
    // maybe use state
    const [citizenship, setCitizenship] = useState(localStorage.getItem('citizenship'));
    const [descent, setDescent] = useState(localStorage.getItem('descent'));
    const [userCitizenship, setUserCitizenship] = useState(["EU citizen", "CPLP citizen"]);
    const [activeVal, setActiveVal] = useState("Non-EU");
    const [descendent, setDescendent] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isLoading, setLoading] = useState(0);

    useEffect(() => {
        console.log(citizenship);
    }, [citizenship]);

    useEffect(() => {
        // Checking localstorage for data so it doesn't need to waste bandwidth
        if (localStorage.getItem('searchResults') == null || JSON.parse(localStorage.getItem('searchResults')).find(x => x.programName === values.programName.replace(values.programName.split(" ", 1), "Degree") && x.universitiesName === values.uniName) == null) {
            // retrieve all data
            setNewUser(true);
            axios.get('https://api.studyportugal.pt/programLookup.php', {
                params: {
                    university: university,
                    program: degree,
                }
            }).then(function (response) {
                if (response.data.success) {
                    setValues({ 
                        ...values, 
                        pic: response.data.data[0].picture,  
                        years: response.data.data[0].duration,
                        programName: response.data.data[0].programName,
                        uniName: response.data.data[0].universitiesName,
                        link: response.data.data[0].link,
                        deadlines: response.data.data[0].deadlines,
                        startDate: response.data.data[0].startDate.data, 
                        tuition: [response.data.data[0].tuition, response.data.data[0].intTuition, response.data.data[0].CPLPtuition],
                        coords: {lat: response.data.data[0].YuniCoords, long: response.data.data[0].XuniCoords}
                    });

                    setViewport({
                        ...viewport,
                        longitude: parseFloat(response.data.data[0].YuniCoords),
                        latitude: parseFloat(response.data.data[0].XuniCoords),
                        transitionDuration: 1000,
                        transitionInterpolator: new FlyToInterpolator(),
                    });
                    setLoading(1);
                }
            }).catch(function (error) {
                // Do something if error
                console.log(error);
            });
        } else {
            setData(JSON.parse(localStorage.getItem('searchResults')).find(x => x.programName === values.programName.replace(values.programName.split(" ", 1), "Degree") && x.universitiesName === values.uniName));
            setDataFetch(1);
        }
    }, []);

    useEffect(() => {
        if (dataFetch == 1) {
            // Set tuition based on user. Check citizenship name accuracy
            if (descent == 1 || citizenship == "EU citizen") {
                setValues({ 
                    ...values, 
                    years: data.duration,
                    link: data.link,
                    startDate: data.startDate,
                    deadlines: data.deadlines,
                    pic: JSON.parse(localStorage.getItem('imageLibrary')).filter(obj => { return obj.id === data.uniID })[0]["picture"],
                    tuition: data.tuition,
                    coords: {lat: data.YuniCoords, long: data.XuniCoords}
                });
                setLoading(1);
            } else if (citizenship == "CPLP citizen") {
                setValues({ 
                    ...values, 
                    years: data.duration,
                    link: data.link,
                    startDate: data.startDate,
                    deadlines: data.deadlines,
                    pic: JSON.parse(localStorage.getItem('imageLibrary')).filter(obj => { return obj.id === data.uniID })[0]["picture"],
                    tuition: data.CPLPtuition,
                    coords: {lat: data.YuniCoords, long: data.XuniCoords}
                });
                setLoading(1);
            } else {
                setValues({ 
                    ...values, 
                    years: data.duration,
                    link: data.link,
                    startDate: data.startDate,
                    deadlines: data.deadlines,
                    pic: JSON.parse(localStorage.getItem('imageLibrary')).filter(obj => { return obj.id === data.uniID })[0]["picture"],
                    tuition: data.intTuition,
                    coords: {lat: data.YuniCoords, long: data.XuniCoords}
                });
                setLoading(1);
            }

            setViewport({
                ...viewport,
                longitude: parseFloat(data.YuniCoords),
                latitude: parseFloat(data.XuniCoords),
                transitionDuration: 1000,
                transitionInterpolator: new FlyToInterpolator(),
            });
            // Verify data
        }
    }, [dataFetch]);


    const handleMouseOver = () => {
        if (isHovering == false) {
            setIsHovering(true);
        }
    };
  
    const handleMouseOut = () => {
        if (isHovering == true) {
            setIsHovering(false);
        }
    };

    const [viewport, setViewport] = useState({
        width: '100%',
        height: 200,
        latitude: 40.1989647,
        longitude: -2.4041716,
        zoom: 11
    });

    function DateConfigerer(props) {
        return (
            <>
                { typeof values.deadlines !== 'undefined' && values.deadlines.length && (
                    (descent == 1 || citizenship == "EU citizen") ? 
                        values.deadlines.filter(date => date.type == 1 && date.round == props.round).length ? 
                            <Moment format="MMMM Do YYYY">
                                {values.deadlines.filter(date => date.type == 1 && date.round == props.round)[0].deadline}
                            </Moment>
                            :
                            "Unknown"
                        :
                        values.deadlines.filter(date => date.type == 2 && date.round == props.round).length ?
                            <Moment format="MMMM Do YYYY">
                                {values.deadlines.filter(date => date.type == 2 && date.round == props.round)[0].deadline}
                            </Moment>
                            :
                            "Unknown"
                    )
                }
            </>
        )
    }

    const SmallDeadline = () => {
        return (
            <div className="bg-light-hover position-relative">
                <h5>
                        <DateConfigerer round="1" />
                </h5>
                <span className="text-muted">Initial application deadline</span>
                <FontAwesomeIcon icon={faInfoCircle} onClick={handleMouseOver} className="position-absolute" style={{top:0, marginTop:'-5px', marginRight: '-15px', right: '0px'}} />
            </div>
        );
    }

    function changeActiveVal(value) {
        // For users that have no data
        setUserCitizenship(userCitizenship.filter(userCitizenship => userCitizenship !== value));
        setUserCitizenship(userCitizenship => [...userCitizenship, activeVal]);
        setActiveVal(value);
        setCitizenship(value);
        setDescendent(0);
      }


      const InfoBox = () => {
          return (
            <div>
                <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    University info
                </Button>
                <Collapse in={open}>
                    <div className="position-relative">
                        <div id="picture" className="rounded shadow-sm position-absolute bg-white" style={{minWidth:'80%', zIndex: 20, backgroundImage:`url("${values.pic}")`, backgroundSize:'cover', backgroundPosition: 'center', aspectRatio: '1 / 1', marginTop: '-85%'}}>

                        </div>
                        <div className="my-5">
                            <h5 className="bold">
                                {values.uniName}
                            </h5>



                            {Array.isArray(values.tuition) ? 
                                <div>
                                    <div className="mb-2">
                                        <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                            EU tuition
                                        </span>
                                        <br />
                                        <span className="bold">???{parseFloat(values.tuition[0]).toLocaleString()}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                            CPLP tuition
                                        </span>
                                        <br />
                                        <span className="bold">???{parseFloat(values.tuition[1]).toLocaleString()}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                            International tuition
                                        </span>
                                        <br />
                                        <span className="bold">???{parseFloat(values.tuition[2]).toLocaleString()}</span>
                                    </div>
                                </div>
                                    :
                                <div className="mb-2">
                                    <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                        Program tuition
                                    </span>
                                    <br />
                                    <span className="bold">???{parseFloat(values.tuition)}</span>
                                </div>
                                
                            }


                            <div className="mb-2">
                                <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                    Program language
                                </span>
                                <br />
                                <span className="bold">
                                    Portuguese
                                </span>
                            </div>
                            <div className="mb-2">
                                <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                    Contacts
                                </span>
                                <br />
                                <div className="d-flex">
                                    {/*<div>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>*/}
                                    <div>
                                        <a href={values.link} target="_blank" className="text-dark">
                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </div>
          )
      }

    const ExtendedDeadlines = () => {
        return (
            <div className="rounded shadow border bg-white position-absolute" id="deadlinesDropdown" style={{width:'120%', marginLeft: '-20px', marginRight: '-20px'}}>
                { newUser ?
                    <Row className="py-3 mx-0 bg-light">
                        <Col className="px-2">
                            <Dropdown drop="up" className="ml-2">
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {activeVal}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {userCitizenship.map((citizenship) =>        
                                        <Dropdown.Item onClick={() => changeActiveVal(citizenship)}>{citizenship}</Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col className="px-2">
                            { activeVal == "Non-EU" && 
                                <Dropdown drop="up" className="mx-2" id="scnd">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {descent ? "EU relative" : "Non-relative"} 
                                    </Dropdown.Toggle>
                            
                                    <Dropdown.Menu>
                                        <div className="mx-3">
                                            The application process is different if you have a parent or grandparent who's a EU citizen
                                            <hr />
                                        </div>
                                        <Dropdown.Item onClick={() => setDescent(descent ? 0 : 1)}>{descent ? "Non-relative" : "EU relative"}</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </Col>
                    </Row>:""
                }
                <div className="px-4 py-3 bg-light-hover">
                    <h5>
                        <DateConfigerer round="1" />
                    </h5>
                <span className="text-muted">Initial application deadline</span>
                </div>
                <div className="px-4 py-3 bg-light-hover">
                    <h5>
                        <DateConfigerer round="2" />
                    </h5>
                    <span className="text-muted">Second Round</span>
                </div>
                <div className="px-4 py-3 bg-light-hover">
                    <h5>
                        <DateConfigerer round="3" />
                    </h5>
                    <span className="text-muted">Third Round</span>
                </div>
            </div>
        );
    }

    return (
        <div id="fullWrapper">
            <Helmet>
                <title>Study Portugal - {values.uniName}, {values.programName} </title>
            </Helmet>
            { !isLoading &&
                <div className="position-absolute w-100 h-100 bg-light d-flex justify-content-center align-items-center" style={{zIndex: "2000"}}>
                    <Spinner animation="border" role="status" style={{color:'grey'}} className="d-flex align-items-center">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            <Navibar homeArea={<Link to="/" class="text-dark text-decoration-none">Home</Link>}/>
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken="pk.eyJ1IjoibHVpem1iciIsImEiOiJja3BuNm9qaWcwcDVvMndxcWRycThiejM1In0.d31VTLX71MVqhvuTCHuWIQ"
            />
            <Container className="mt-5">
                <Row>
                    <Col xs={12} sm={10} md={3} className="mb-4">
                        <div className="position-relative">
                            <div id="picture" className="rounded shadow-sm position-absolute bg-white" style={{minWidth:'80%', zIndex: 20, backgroundImage:`url("${values.pic}")`, backgroundSize:'cover', backgroundPosition: 'center', aspectRatio: '1 / 1', marginTop: '-85%'}}>

                            </div>
                            <div className="mt-5">
                                <h5 className="bold">
                                    {values.uniName}
                                </h5>



                                {Array.isArray(values.tuition) ? 
                                    <div>
                                        <div className="mb-2">
                                            <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                                EU tuition
                                            </span>
                                            <br />
                                            <span className="bold">???{parseFloat(values.tuition[0]).toLocaleString()}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                                CPLP tuition
                                            </span>
                                            <br />
                                            <span className="bold">???{parseFloat(values.tuition[1]).toLocaleString()}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                                International tuition
                                            </span>
                                            <br />
                                            <span className="bold">???{parseFloat(values.tuition[2]).toLocaleString()}</span>
                                        </div>
                                    </div>
                                        :
                                    <div className="mb-2">
                                        <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                            Program tuition
                                        </span>
                                        <br />
                                        <span className="bold">???{parseFloat(values.tuition)}</span>
                                    </div>
                                    
                                }


                                <div className="mb-2">
                                    <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                        Program language
                                    </span>
                                    <br />
                                    <span className="bold">
                                        Portuguese
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                        Contacts
                                    </span>
                                    <br />
                                    <div className="d-flex">
                                        {/*<div>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </div>*/}
                                        <div>
                                            <a href={values.link} target="_blank" className="text-dark">
                                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={9}>
                        <div className="mb-3">
                            <h3>
                                {values.programName.replace("Degree", "Bachelor's")}
                            </h3>
                        </div>
                        <Card className="p-3 shadow-sm">
                            <Row>
                                <Col className="text-center">
                                    <h5>{parseFloat(values.years)} years</h5>
                                    <span className="text-muted">Duration</span>
                                </Col>
                                <Col className="text-center position-relative d-flex justify-content-center">
                                    <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseOut} className="w-100" style={{height:'fit-content'}}>
                                        {isHovering ? <ExtendedDeadlines /> : <SmallDeadline />}
                                    </div>
                                </Col>
                                <Col className="text-center">
                                    <h5>
                                        { values.startDate != "0000-00-00" ?
                                        <Moment format="MMMM Do YYYY">
                                            {values.startDate}
                                        </Moment>: "Unknown"
                                        }
                                    </h5>
                                    <span className="text-muted">Start date</span>
                                </Col>
                            </Row>
                        </Card>
                        <div>
                            <div className="mt-4">
                                <div className="mb-4">
                                    <h5>
                                        About program
                                    </h5>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                </div>
                                <div className="mb-4">
                                    <h5>
                                        Nearby housing
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}