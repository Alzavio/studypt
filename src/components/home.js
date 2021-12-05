import React, { useState, useEffect } from "react";
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
import { useStore } from '../state/searchResults';
import Navibar from "./microComponents/navbar"; 
import { useNavigate } from "react-router-dom";
import 'font-awesome/css/font-awesome.css';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { Helmet } from "react-helmet";
import { SetState } from "zustand";
import axios from "axios";

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
      if (response.data.success) {
        setCookie('citizenship', citizenship, { path: '/' });
        setCookie('descent', byDescent, { path: '/' });
        useStore.setState({ search: citizenship, results: byDescent });
        setLoading(2);
      }
      console.log(response.data);
    });
    e.preventDefault();
  }

  useEffect(() => {    
     if (loading == 2) {
     }
  }, [loading]);

  return (
    <div className="min-vh-100 d-flex">
      <Helmet>
        <title>Study in Portugal</title>
        <meta name="description" content="Find information on how to study in Portugal at any of the more than 130 universities and polytechnics. From bachelors degrees, to language programs, to student visa information." />
      </Helmet>

      <Navibar />

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
