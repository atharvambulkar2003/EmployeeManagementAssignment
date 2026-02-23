import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [allEmployees,setAllEmployees] = useState([]);

    const fetchAllEmployees = async() => {
        try {
            const response = await fetch("http://localhost:8082/api/findAll/employee");
            const data = await response.json();
            if(data.success){
                console.log(data);
                setAllEmployees(data.users);
            }else{  
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const login = (user) => {
        setUser(user);
        setIsAuthenticated(true);
        if(user.role==="admin"){
            fetchAllEmployees();
        }
        localStorage.setItem("user", user);
        navigate("/");
    };
    
    const logout = () =>{
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        navigate("/login");
    } 

    return (
        <AppContext.Provider value={{ 
            user, 
            login, 
            logout,
            isAuthenticated,
            allEmployees,
            setAllEmployees,
            setUser
        }}>
            {children}
        </AppContext.Provider>
    );
};