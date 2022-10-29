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
        <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
        <Nav.Link onClick={() => { navigate('/map') }}>Map</Nav.Link>
        <Nav.Link onClick={() => { navigate('/checkdong') }}>CheckDong</Nav.Link>
      </Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/checkdong" element={<CheckDong />} />
      </Routes>
    </>
  );
}

export default App;
