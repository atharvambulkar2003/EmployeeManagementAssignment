import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate, useNavigate } from 'react-router-dom';

const UserDashBoard = () => {
  const { user, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  let imageSrc = "https://via.placeholder.com/150";
  if (user?.profile_image?.data) {
    const base64String = btoa(
      new Uint8Array(user.profile_image.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    imageSrc = `data:image/png;base64,${base64String}`;
  }

  const handleUpdate = () => {
    navigate("/update")
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h4 className="mb-0">My Profile</h4>
            </div>
            <div className="card-body text-center">
              <img 
                src={imageSrc} 
                alt="Profile" 
                className="rounded-circle mb-3 shadow-sm" 
                style={{ width: "150px", height: "150px", objectFit: "cover", border: "4px solid #f8f9fa" }} 
              />
              
              <h3 className="fw-bold">{user.name}</h3>
              <p className="badge bg-info text-dark">{user.role || 'Employee'}</p>
              
              <hr />

              <div className="text-start px-4">
                <div className="mb-3">
                  <label className="text-muted small">Employee ID</label>
                  <p className="fw-bold">{user.empid}</p>
                </div>
                
                <div className="mb-3">
                  <label className="text-muted small">Email Address</label>
                  <p className="fw-bold">{user.email}</p>
                </div>
              </div>

              <div className="d-grid gap-2 mt-4 px-4">
                <button 
                  className="btn btn-primary" 
                  onClick={handleUpdate}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;