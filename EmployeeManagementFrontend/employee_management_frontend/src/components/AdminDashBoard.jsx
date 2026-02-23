import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";
import IndividualEmployee from "./IndividualEmployee";

const AdminDashBoard = () => {
  const { allEmployees, setAllEmployees, isAuthenticated } =
    useContext(AppContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (selectedEmployee) {
      const exists = allEmployees.find(emp => emp.id === selectedEmployee.id);
      if (!exists) {
        setSelectedEmployee(null); 
      }
    }
  }, [allEmployees, selectedEmployee]);

  return (
    <div className="row">
      <div className="col-12 p-3 ms-2">
        <h5 className="display-6 fw-bold text-secondary">
          Total Employees :{" "}
          <span className="text-primary">{allEmployees.length}</span>
        </h5>
        <hr />
      </div>
      <div className="col-md-8 d-flex flex-wrap justify-content-center p-3">
        {allEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={() => setSelectedEmployee(employee)}
          />
        ))}
      </div>
      <div className="col-md-4 border-start p-3">
        {selectedEmployee ? (
          <IndividualEmployee employee={selectedEmployee} />
        ) : (
          <p className="text-muted text-center mt-5">Select an employee</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashBoard;
