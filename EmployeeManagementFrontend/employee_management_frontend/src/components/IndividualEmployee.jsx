import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const IndividualEmployee = ({ employee }) => {
  const { allEmployees, setAllEmployees } = useContext(AppContext);

  const handleDelete = async (empId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/delete/employee/${empId}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (data.success) {
        setAllEmployees(allEmployees.filter(emp => emp.id !== empId));
      }
    } catch (error) {
      console.log( error);
    }
  };

  let imageSrc = "https://via.placeholder.com/150";
  if (employee?.profile_image?.data) {
    const base64String = btoa(
      new Uint8Array(employee.profile_image.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    imageSrc = `data:image/png;base64,${base64String}`;
  }

  return (
    <div className="card shadow-sm border-0 animate__animated animate__fadeIn">
      <img 
        src={imageSrc} 
        className="card-img-top" 
        alt="Profile" 
        style={{ 
            height: "500px", 
            width: "100%",      
            objectFit: "cover", 
            borderRadius: "8px 8px 0 0" 
        }} 
      />
      <div className="card-body">
        <h4 className="fw-bold mb-0">{employee.name}</h4>
        <p className="text-primary small mb-3">Pratiti Technology</p>
        
        <hr />
        
        <div className="mb-3">
          <p className="mb-1 text-muted small">Employee ID</p>
          <p className="fw-bold">{employee.empid}</p>
          
          <p className="mb-1 text-muted small">Email Address</p>
          <p className="fw-bold">{employee.email}</p>
        </div>

        <div className="d-grid gap-2">
          <button 
            className="btn btn-danger" 
            onClick={() => handleDelete(employee.id)}
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualEmployee;