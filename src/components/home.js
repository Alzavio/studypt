import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';
import { Navbar, Container, Nav, Card, NavDropdown, Dropdown, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { Image, Transformation } from 'cloudinary-react';
import Twemoji from 'react-twemoji';

function App() {
  const [citizenship, setCitizenship] = useState(["EU citizen", "CPLP citizen"]);
  const [activeVal, setActiveVal] = useState("Non-EU citizen");
  const [descent, setDescent] = useState(0);
  function changeActiveVal(value) {
    // value is the item clicked
    setCitizenship(citizenship.filter(citizenship => citizenship !== value));
    setCitizenship(citizenship => [...citizenship, activeVal]);
    setActiveVal(value);
  }
  return (
    <div className="min-vh-100 d-flex">
      <div bg="dark" style={{position: 'absolute', backgroundColor: 'black', width: '100%', height: '100%'}}>
        <Image cloudName="studyportugal-pt" crop="scale" className="w-100 h-100" secure="true" publicId="coimbra2" dpr="auto" responsive width="auto" crop="scale" alt="Background" style={{opacity: .9}}>
          <Transformation quality="auto" crop="scale"  />
          <Transformation fetchFormat="auto" />
        </Image>
      </div>


      <Navbar style={{position: 'absolute', width: '100%'}}>
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
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
              <h1 className="position-relative display-2 text-light">
                Study in Portugal
              </h1>
              <div className="mb-2 d-flex">
                <Dropdown drop="up" className="shadow">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {activeVal}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {citizenship.map((citizenship) =>        
                      <Dropdown.Item onClick={() => changeActiveVal(citizenship)}>{citizenship}</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                { activeVal == "Non-EU citizen" &&
                <Dropdown drop="up" className="mx-2 shadow">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {descent ? "Portuguese descendent" : "Not a relative of an EU member"} 
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setDescent(descent ? 0 : 1)}>{descent ? "Not a relative of an EU member" : "Portuguese descendent"}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                }
              </div>

              <InputGroup className="mb-3 shadow">
                <FormControl
                  placeholder="Search a degree or course..."
                  aria-label="Search a degree"
                  aria-describedby="searchbtn"
                  className="p-2 border-0"
                />
                <Button variant="secondary" id="searchbtn">
                  Search
                </Button>
              </InputGroup>
              
              <Row>
                <Col xs={4}>
                  <Card className="p-1 h-100 border-0 shadow">
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
                  <Card className="p-1 h-100 border-0 shadow">
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
