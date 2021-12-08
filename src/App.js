import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/home';
import Search from './components/search';
import Faq from './components/faq';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/faq" element={<Faq />} />
        <Route path="/search" element={<Search />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
