import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
    Row,
    Col,
    Container,
    Card
} from 'react-bootstrap';
import Navibar from "./microComponents/navbar"; 
import '../css/global.css';
import '../css/program.css';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.css';

export default function Program() {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: 200,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });
    const { university, degree } = useParams();
    const [programName, setProgramName] = useState(degree);
    const [uniName, setUniName] = useState(university);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('searchResults')).find(x => x.programName === programName.replace(programName.split(" ", 1), "Degree") && x.universitiesName === uniName));
    const [tuition, setTuition] = useState(data.tuition);
    const [languages, setLanguages] = useState();
    const [link, setLink] = useState();
    const [years, setYears] = useState(data.duration);
    const [appDate, setAppDate] = useState();
    const [startDate, setStartDate] = useState();
    const [pic, setPic] = useState(data.picture);
    // maybe use state
    const [citizenship, setCitizenship] = useState(localStorage.getItem('citizenship'));
    const [descent, setDescent] = useState(localStorage.getItem('descent'));

    function verifyData() {

    }

    function retrieveData() {
        
    }

    useEffect(() => { 
        // Checking localstorage for data so it doesn't need to waste bandwidth

        // Set tuition based on user. Check citizenship name accuracy
        console.log(data);
        if (descent == 1 || citizenship == "EU citizen") {
            setTuition(data.tuition);
        } else if (citizenship == "CPLP citizen") {
            setTuition(data.CPLPtuition);
        } else {
            setTuition(data.intTuition);
        }

        // Check data
    }, []);

    return (
        <div id="fullWrapper">
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken="pk.eyJ1IjoibHVpem1iciIsImEiOiJja3BuNm9qaWcwcDVvMndxcWRycThiejM1In0.d31VTLX71MVqhvuTCHuWIQ"
            />
            <Navibar />
            <Container className="mt-5">
                <Row>
                    <Col xs={3}>
                        <div className="position-relative">
                            <div className="rounded shadow-sm position-absolute bg-white" style={{minWidth:'80%', backgroundImage:`url("${pic}")`, backgroundSize:'cover', backgroundPosition: 'center', aspectRatio: '1 / 1', marginTop: '-85%'}}>

                            </div>
                            <div className="mt-5">
                                <h5 className="bold">
                                    {uniName}
                                </h5>
                                <div className="mb-2">
                                    <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                        Program tuition
                                    </span>
                                    <br />
                                    <span className="bold">
                                        €{parseFloat(tuition)}
                                    </span>
                                </div>
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
                                    <span>
                                        <FontAwesomeIcon icon={faEnvelope} /> &nbsp; <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={9}>
                        <div className="mb-3">
                            <h3>
                                {programName}
                            </h3>
                        </div>
                        <Card className="p-3 shadow-sm">
                            <Row>
                                <Col className="text-center">
                                    <h5 className="">{parseFloat(years)} years</h5>
                                    <span className="text-muted">Duration</span>
                                </Col>
                                <Col className="text-center">
                                    <h5 className="">August 5<sup>th</sup> 2020</h5>
                                    <span className="text-muted">Application deadline</span>
                                </Col>
                                <Col className="text-center">
                                    <h5 className="">October 15<sup>th</sup> 2020</h5>
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
                                        Nearby apartments
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