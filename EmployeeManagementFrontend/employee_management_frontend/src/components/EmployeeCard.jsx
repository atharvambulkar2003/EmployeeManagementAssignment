import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ employee, onClick }) => {
  const navigate = useNavigate();

  let imageSrc = "https://via.placeholder.com/150";

  if (employee.profile_image && employee.profile_image.data) {
    const base64String = btoa(
      new Uint8Array(employee.profile_image.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        "",
      ),
    );
    imageSrc = `data:image/png;base64,${base64String}`;
  }

  return (
    <div className="card m-2" style={{ width: "18rem",cursor: "pointer" }}  onClick={onClick}>
      <img
        src={imageSrc}
        className="card-img-top"
        alt="Employee"
        style={{
          height: "300px",
          width: "100%",
          objectFit: "cover",
          borderRadius: "8px 8px 0 0",
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{employee.name}</h5>

        <div className="card-text mb-3">
          <p className="mb-1 text-muted small">ID: {employee.empid}</p>
          <p className="mb-1">
            <strong>Company:</strong>"Pratiti Technology"
          </p>
          <p className="mb-0">
            <strong>Email:</strong> {employee.email}
          </p>
        </div>

        <button className="btn btn-primary">View Details</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
