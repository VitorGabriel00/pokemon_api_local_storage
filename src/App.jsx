import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home"
import Nav from "./components/navBarra"
import Favoritos from "./pages/favoritos"


function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;