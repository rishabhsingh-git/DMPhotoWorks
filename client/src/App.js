import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Home, Navbar, AboutContact, Portfolio, Admin, ManageAssets } from "./components/index";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin")
  console.log(`==========================>`,isAdminRoute)

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about&contact" element={<AboutContact />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="manage&assets" element={<ManageAssets />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
