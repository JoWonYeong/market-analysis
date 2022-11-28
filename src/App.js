import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Map from './Pages/Map';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';

function App() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate('/commercial-analysis/')
  }, [])

  return (
    <>
      <Map />
    </>
  );
}

export default App;
