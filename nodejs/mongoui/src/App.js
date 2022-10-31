import { Routes, Route, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import './App.css';
import Home from './pages/home';
import Summary from './pages/summary';

function App() {
  let navigate = useNavigate();

  return (
    <>
      <Nav className="justify-content-center">
        <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
        <Nav.Link onClick={() => { navigate('/build-summary') }}>summary</Nav.Link>
      </Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build-summary" element={<Summary />} />
      </Routes>
    </>
  );
}

export default App;
