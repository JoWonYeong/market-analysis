import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Home from './Pages/Home';
import Map from './Pages/Map';
import CheckDong from './Pages/checkDong'

function App() {
  let navigate = useNavigate();

  return (
    <>
      <Nav className="justify-content-center">
        <Nav.Link onClick={() => { navigate('/commercial-analysis/') }}>Home</Nav.Link>
        <Nav.Link onClick={() => { navigate('/commercial-analysis/map') }}>Map</Nav.Link>
        <Nav.Link onClick={() => { navigate('/commercial-analysis/checkdong') }}>CheckDong</Nav.Link>
      </Nav>

      <Routes>
        <Route path="/commercial-analysis/" element={<Home />} />
        <Route path="/commercial-analysis/map" element={<Map />} />
        <Route path="/commercial-analysis/checkdong" element={<CheckDong />} />
      </Routes>
    </>
  );
}

export default App;
