import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';
import { Navbar, Container, Nav, Card, NavDropdown, Dropdown, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { Image, Transformation } from 'cloudinary-react';
import Twemoji from 'react-twemoji';

function App() {
  return (
    <div className="min-vh-100 d-flex">
      <div bg="dark" style={{position: 'absolute', backgroundColor: 'black', width: '100%', height: '100%'}}>
        <Image cloudName="studyportugal-pt" crop="scale" className="w-100 h-100" secure="true" publicId="coimbra2" dpr="auto" responsive width="auto" crop="scale" alt="Background" style={{opacity: .8}}>
          <Transformation quality="auto" crop="scale"  />
          <Transformation fetchFormat="auto" />
        </Image>
      </div>


      <Navbar style={{position: 'absolute', width: '100%'}}>
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

            </Nav>
            <Nav>
              <Nav.Link href="#deets" className="mx-4" style={{color: 'white'}}>
                University List
              </Nav.Link>
              <Nav.Link href="#memes" style={{color: 'white'}}>
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container className="d-flex" style={{flex:1, justifyContent: 'center'}}>
        <Row className="w-100">
          <Col xs={9} className="d-flex" style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <div className="w-100">
              <div className="mb-2 d-flex">
                <Dropdown drop="up">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Non-EU citizen
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">CPLP</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">EU member</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown drop="up" className="mx-2">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Portuguese descent
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Not a relative of an EU member</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search a degree"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  className="p-2"
                />
                <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
              </InputGroup>
              
              <Row>
                <Col xs={4}>
                  <Card className="p-1 h-100">
                    <Card.Body>
                      <Card.Title>
                        <div className="d-flex">
                          <Twemoji options={{ className: 'twemoji' }} style={{width:'2rem'}}>
                            🇬🇧
                          </Twemoji>
                          <div className="mx-2 d-flex align-items-center">
                            In English
                          </div>
                        </div>
                        </Card.Title>
                      <Card.Text>
                        English degrees at accredited Portuguese universities.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={4}>
                  <Card className="p-1 h-100">
                    <Card.Body>
                      <Card.Title>
                        <div className="d-flex">
                          <Twemoji options={{ className: 'twemoji' }}>
                            🇵🇹
                          </Twemoji>
                          <div className="mx-2 d-flex align-items-center">
                            Study Portuguese
                          </div>
                        </div>
                      </Card.Title>
                      <Card.Text>
                        Available from 20 Portuguese universities.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
