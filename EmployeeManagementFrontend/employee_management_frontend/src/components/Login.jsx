import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Login() {
    const { login } = useContext(AppContext);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8082/api/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    username,password
                })
            })
            const data = await response.json();
            if(data.success){
                console.log(data.user);
                login(data.user);
            }else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">Employee Management System</h4>
            </div>

            <p>Please login to your account</p>

            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='email' value={username} onChange={e=>setUsername(e.target.value)} required/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={e=>setPassword(e.target.value)} required/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleSubmit}>Sign in</MDBBtn>
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">Employee Management System</h4>
              <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;