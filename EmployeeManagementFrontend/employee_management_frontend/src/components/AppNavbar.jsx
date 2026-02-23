import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AppNavbar = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <span className="bg-success text-white px-2 py-1 rounded-3 me-2">EM</span>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="mb-0">Welcome, <strong>{user.name}</strong></span>
                <button 
                  className="btn btn-outline-danger" 
                  type="button" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                className="btn btn-outline-success" 
                type="button" 
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;