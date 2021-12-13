import React, { useState } from "react";
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

export default function Program() {
    const [viewport, setViewport] = useState({
        width: '100%',
        height: 200,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
    });
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
                            University of Braga
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
                                Bachelor's in Computer Science
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
                    </Col>
                </Row>
            </Container>
        </div>
    )
}