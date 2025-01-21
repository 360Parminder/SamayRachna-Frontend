import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './Auth';
import userAuth from '../Api/userAuth';

// Create a context
export const UserDataContext = createContext();

// Create a provider component
export const UserDataProvider = ({ children }) => {
    const {token,authenticated} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const profile = async() =>{
            const response = await userAuth.profile(token);
            if (response.success) {
            setUserData(response.data);
            }
    }

    useEffect(() => {
        profile();

    }, [token,authenticated]);
        

    return (
        <UserDataContext.Provider value={{ userData, setUserData, profile }}>
            {children}
        </UserDataContext.Provider>
    );
};
