import React from 'react'

import  { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Navigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user, setUser, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  if (!isAuthenticated){
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8082/api/update/employee/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }), 
      });

      const data = await response.json();

      if (data.success) {
        setUser({ ...user, name, email });
        navigate("/");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4 text-center">Update Details</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="d-flex flex-column gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100" 
                  >
                    Update Profile
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-light w-100" 
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
