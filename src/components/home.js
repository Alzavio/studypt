import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/home.css';
import { 
  Navbar,
  Container, 
  Nav, 
  Card, 
  NavDropdown, 
  Dropdown, 
  Button, 
  InputGroup, 
  FormControl, 
  Row, 
  Col,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { Image, Transformation } from 'cloudinary-react';
import { Helmet } from "react-helmet";
import Twemoji from 'react-twemoji';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import 'font-awesome/css/font-awesome.css';


const polytechnics = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    A polytechnic is a higher education institution in Portugal which can give licentiates (similar to a Bachelors), and masters degrees.
  </Tooltip>
);

function App() {
  const [citizenship, setCitizenship] = useState(["EU citizen", "CPLP citizen"]);
  const [activeVal, setActiveVal] = useState("Non-EU citizen");
  const [descent, setDescent] = useState(0);
  const [loading, setLoading] = useState(0);
  function changeActiveVal(value) {
    // value is the item clicked
    setCitizenship(citizenship.filter(citizenship => citizenship !== value));
    setCitizenship(citizenship => [...citizenship, activeVal]);
    setActiveVal(value);
    setDescent(0);
  }

  const requestData = function (e) {
    setLoading(1);
    alert('it works!');
    e.preventDefault();
  }

  
  return (
    <div className="min-vh-100 d-flex">
      <Helmet>
        <title>Study in Portugal</title>
        <meta name="description" content="Find information on how to study in Portugal at any of the more than 130 universities and polytechnics. From bachelors degrees, to language programs, to student visa information." />
      </Helmet>
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
                    {descent ? "Relative of EU member" : "Not a relative of an EU member"} 
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="mx-3">
                        Tuition may be lower if you have a parent or grandparent who's a citizen of an EU country<FontAwesomeIcon icon={faCoffee} />
                      <hr />
                    </div>
                    <Dropdown.Item onClick={() => setDescent(descent ? 0 : 1)}>{descent ? "Not a relative of an EU member" : "Relative of EU member"}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                }
              </div>

              <form onSubmit={requestData}>
                <input type="hidden" value={activeVal} name="citizenship" />
                <input type="hidden" value={descent} name="descent" />
                <InputGroup className="mb-3 shadow">
                  <FormControl
                    placeholder="Search a degree or course..."
                    aria-label="Search a degree"
                    aria-describedby="searchbtn"
                    className="p-2 border-0"
                    name="search"
                  />
                  <Button variant="secondary" type="submit" id="searchbtn">
                    Search
                  </Button>
                </InputGroup>
              </form>
              
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
                        Courses taught in English at accredited Portuguese universities.
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
                        Available from 20 Portuguese universities,&nbsp;
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 250, hide: 400 }}
                          overlay={polytechnics}
                        >
                          <abbr title="">polytechnics</abbr>
                        </OverlayTrigger>
                        , and institutions.
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
