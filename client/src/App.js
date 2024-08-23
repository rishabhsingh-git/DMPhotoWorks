import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home, Navbar, AboutContact, Portfolio, Admin } from "./components/index"


function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about&contact" element={<AboutContact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  </Router>
  );
}

export default App;
