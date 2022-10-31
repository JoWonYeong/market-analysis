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
        <Nav.Link onClick={() => { navigate('/dbui/') }}>Home</Nav.Link>
        <Nav.Link onClick={() => { navigate('/dbui/build-summary') }}>summary</Nav.Link>
      </Nav>

      <Routes>
        <Route path="/dbui/" element={<Home />} />
        <Route path="/dbui/build-summary" element={<Summary />} />
      </Routes>
    </>
  );
}

export default App;
