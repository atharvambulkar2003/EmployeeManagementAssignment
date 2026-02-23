import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, useNavigate } from 'react-router-dom';
import AdminDashBoard from './AdminDashBoard';
import UserDashBoard from './UserDashBoard';

const Home = () => {

    const {user,isAuthenticated} = useContext(AppContext);

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }

  return (
    <div>
        {
            user?.role === "admin"?<AdminDashBoard/>:<UserDashBoard/>
        }
    </div>
  )
}

export default Home
