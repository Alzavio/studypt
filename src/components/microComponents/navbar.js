import React from "react";
import { 
    Navbar,
    Container, 
    Nav, 
  } from 'react-bootstrap';
import Twemoji from 'react-twemoji';
import { Link } from "react-router-dom";

export default function Navibar(props) {
    return (
        <Navbar style={{position: 'absolute', width: '100%', marginTop: '.75rem', top: 0, zIndex: 20}}>
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto text-secondary" id="label"> 
                        {props.homeArea}
                    </Nav>
                    <Nav>
                        <Nav.Link className="mx-2 text-dark">
                            Visa info
                        </Nav.Link>
                        <Nav.Link className="mx-2 text-dark">
                            Universities
                        </Nav.Link>
                        <Nav.Link className="mx-2 text-dark">
                            <Link to="/faq" className="text-dark text-decoration-none">
                                FAQ
                            </Link>
                        </Nav.Link>
                        <Nav.Link className="mx-2 text-dark">
                            <Link to="/contact" className="text-dark text-decoration-none">
                                Contact
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
