import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
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
import { useEffect } from "react";
import { setupInterceptors } from "./common/common";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.includes("/admin");
  const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

  useEffect(() => {
    if (userDetails.isAdmin && location.pathname === "/admin-signin") {
      navigate("/admin-dashboard");
    }
  }, [userDetails.isAdmin, location.pathname, navigate, userDetails?.userId]);

  useEffect(() => {
    setupInterceptors(navigate);
  }, []);
  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about-contact" element={<AboutContact />} />
        {userDetails.isAdmin ? (
          <Route path="/admin-dashboard" element={<Admin />}>
            <Route path="manage-assets" element={<ManageAssets />} />
          </Route>
        ) : (
          <Route path="/admin-signin" element={<AdminLoginPage />} />
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
