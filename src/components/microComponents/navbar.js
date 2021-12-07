import React from "react";
import { 
    Navbar,
    Container, 
    Nav, 
  } from 'react-bootstrap';
import Twemoji from 'react-twemoji';

export default function Navibar() {
    return (
        <Navbar style={{position: 'absolute', width: '100%', marginTop: '.75rem', top: 0}}>
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto text-secondary"> 
                        Developed in <Twemoji options={{ className: 'twemoji' }} style={{margin: '0 .25rem 0 .25rem'}}>🇵🇹</Twemoji> by&nbsp;<a className="text-decoration-none text-muted" href="https://www.linkedin.com/in/luiz-r-02391992/" target="_blank">Luiz</a>
                    </Nav>
                    <Nav>
                        <Nav.Link className="mx-2 text-dark">
                            Visa info
                        </Nav.Link>
                        <Nav.Link className="mx-2 text-dark">
                            Universities
                        </Nav.Link>
                        <Nav.Link className="mx-2 text-dark">
                            FAQ
                        </Nav.Link>
                        <Nav.Link className="mx-2 text-dark">
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}