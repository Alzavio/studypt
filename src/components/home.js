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
  Spinner,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Image, Transformation } from 'cloudinary-react';
import 'font-awesome/css/font-awesome.css';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet";
import Twemoji from 'react-twemoji';
import axios from "axios";

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
  const [cookies, setCookie] = useCookies();
  function changeActiveVal(value) {
    // value is the item clicked
    setCitizenship(citizenship.filter(citizenship => citizenship !== value));
    setCitizenship(citizenship => [...citizenship, activeVal]);
    setActiveVal(value);
    setDescent(0);
  }

  const requestData = function (e) {
    setLoading(1);
    const search = e.target.search.value;
    const citizenship = e.target.citizenship.value;
    const byDescent = e.target.descent.value;
    const data = {search, citizenship, byDescent};
    console.log(search);

    axios.get('https://api.studyportugal.pt/search.php', {
      params: {
        search: search,
        citizenship: citizenship,
        descent: byDescent
      }
    }).then(function (response) {
      if (response.success) {
        setCookie('citizenship', citizenship, { path: '/' });
        setCookie('descent', byDescent, { path: '/' });
      }
      console.log(response);
    });

    e.preventDefault();
  }

  
  return (
    <div className="min-vh-100 d-flex">
      <Helmet>
        <title>Study in Portugal</title>
        <meta name="description" content="Find information on how to study in Portugal at any of the more than 130 universities and polytechnics. From bachelors degrees, to language programs, to student visa information." />
      </Helmet>

      <Navbar style={{position: 'absolute', width: '100%', marginTop: '.75rem'}}>
        <Container>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto text-secondary"> 
              Developed in <Twemoji options={{ className: 'twemoji' }} style={{margin: '0 .25rem 0 .25rem'}}>🇵🇹</Twemoji> by Alzavio
            </Nav>
            <Nav>
              <Nav.Link href="#deets" className="mx-2 text-dark">
                Visa info
              </Nav.Link>
              <Nav.Link href="#deets" className="mx-2 text-dark">
                Universities
              </Nav.Link>
              <Nav.Link href="#deets" className="mx-2 text-dark">
                FAQ
              </Nav.Link>
              <Nav.Link href="#memes" className="mx-2 text-dark">
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <div className="w-100 mx-5" style={{marginTop: '7.5rem'}}>
        <div className="d-flex" style={{flex:1, flexDirection: 'row', position: 'relative', backgroundColor: '#046535', padding: '20px'}}>
          <div style={{padding: '87px 42px 87px 55px', flexBasis:'45%', backgroundColor: '#e6f7f5', marginTop:'-40px', zIndex: '2'}}>
              <h1 className="position-relative bold">
                Discover Portugal
              </h1>
              <h3 className="mb-4">
                Study at any of 200+ available programs 
              </h3>
              <div
                className="d-flex mb-2"
              >
                <h4 style={{whiteSpace:'nowrap', marginRight:'.25rem'}}>I'm a...</h4>
                <Dropdown drop="up" className="ml-2">
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
                <Dropdown drop="up" className="mx-2">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {descent ? "Relative of EU member" : "Not a relative of an EU member"} 
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="mx-3">
                        Tuition may be lower if you have a parent or grandparent who's a citizen of an EU country
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
                <InputGroup className="mb-3 shadow rounded border">
                  <FormControl
                    placeholder="Search a degree or course..."
                    aria-label="Search a degree"
                    aria-describedby="searchbtn"
                    className="p-2 border-0"
                    name="search"
                  />
                  <Button variant="secondary" className="border-0 bg-white" type="submit">
                    { loading ? 
                    <Spinner animation="border" role="status" style={{color:'grey'}} className="d-flex align-items-center">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                      <FontAwesomeIcon icon={faSearch} flip="horizontal" color="grey"/>
                    }
                  </Button>
                </InputGroup>
              </form>
          </div>  
          <div bg="dark" className="d-flex" style={{position: 'absolute', top: '-60px', alignItems:'center', width:'70%', height:'calc(100% + 100px)', right: '0', padding: 'inherit', objectFit:'cover'}}>
              <Image cloudName="studyportugal-pt" className="h-100 w-100" publicId="castle" alt="Background">
                <Transformation fetchFormat="auto" />
              </Image>
              <div style={{position:'absolute', bottom: '1.5rem', right: '25px', opacity: '.7'}} className="bg-light rounded">
                &nbsp;Sintra, Portugal&nbsp;
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
