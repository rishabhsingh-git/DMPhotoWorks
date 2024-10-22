import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Navbar,
  AboutContact,
  Portfolio,
  Admin,
  ManageAssets,
  AdminLoginPage,
} from "./components/index";

const isLoggedIn = true;
function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin");

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about-contact" element={<AboutContact />} />
        {false ? (
          <Route path="/admin-dashboard" element={<Admin />}>
            <Route path="manage-assets" element={<ManageAssets />} />
          </Route>
        ) : (
          <Route path="/admin-signin" element={<AdminLoginPage />}></Route>
        )}
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
