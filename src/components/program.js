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

export default function Program() {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: 200,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });
    const { university, degree } = useParams();
    const [tuition, setTuition] = useState();
    const [languages, setLanguages] = useState();
    const [link, setLink] = useState();
    const [years, setYears] = useState();
    const [appDate, setAppDate] = useState();
    const [startDate, setStartDate] = useState();
    const [uniName, setUniName] = useState(university);
    const [programName, setProgramName] = useState(degree);
    const [data, setData] = useState(localStorage.getItem('searchResults'));

    function verifyData() {

    }

    function retrieveData() {
        
    }

    useEffect(() => { 
        // Checking localstorage for data so it doesn't need to waste bandwidth
        console.log(JSON.parse(localStorage.getItem('searchResults')))

        // Check data
    }, []);

    return (
        <div id="fullWrapper">
            <ReactMapGL
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapboxApiAccessToken="pk.eyJ1IjoibHVpem1iciIsImEiOiJja3BuNm9qaWcwcDVvMndxcWRycThiejM1In0.d31VTLX71MVqhvuTCHuWIQ"
            />
            <Navibar />
            <Container className="mt-5">
                <Row>
                    <Col xs={3}>
                        <div>

                        </div>
                        <h5 className="bold">
                            {uniName}
                        </h5>
                        <div className="mb-2">
                            <span className="sideLabel text-muted" style={{fontSize:'.9rem'}}>
                                Program tuition
                            </span>
                            <br />
                            <span className="bold">
                                $2,500
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
                                Contact
                            </span>
                            <br />
                            <span>
                                julia@coimbra.pt
                            </span>
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
                                    <h5 className="">3 years</h5>
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
                                <h5>
                                    About program
                                </h5>
                                <h5>
                                    Nearby apartments
                                </h5>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}