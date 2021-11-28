import React from "react";
import { Navbar, Container, Nav, Card, NavDropdown, Dropdown, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { Image, Transformation } from 'cloudinary-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Twemoji from 'react-twemoji';
import '../css/home.css';

export default function App() {
    return (
    <div>
        <Navbar>
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        Study in Portugal
                    </Nav>
                    <Nav>
                    <Nav.Link href="#deets" className="mx-4">
                        University List
                    </Nav.Link>
                    <Nav.Link href="#memes">
                        Contact
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div>
            <Image cloudName="studyportugal-pt" crop="scale" className="w-100 h-100" secure="true" publicId="coimbra2" dpr="auto" responsive width="auto" crop="scale" alt="Background">
                <Transformation quality="auto" crop="scale"  />
                <Transformation fetchFormat="auto" />
            </Image>
            <div style={{backgroundColor: 'orange', opacity: .4, position: 'relative', top: '50%'}}>
                test
            </div>
        </div>
    </div>
    )
}