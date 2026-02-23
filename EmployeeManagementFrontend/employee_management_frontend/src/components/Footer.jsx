import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-top py-3 mt-auto">
      <div className="container text-center">
        <p className="text-muted mb-0 small">
          &copy; {new Date().getFullYear()} <strong>EmployeePortal</strong>. 
          
        </p>
        <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
          Efficiently Managing Human Capital
        </div>
      </div>
    </footer>
  );
};

export default Footer
