import React, { createContext, useState, useContext, useEffect } from 'react';
import userAuth from '../Api/userAuth';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(()=>{
        const checkToken = async() => {
            const token = await EncryptedStorage.getItem('token');
            if (token) {
                setToken(token);
                setAuthenticated(true);
                
            }
        };
        checkToken();

    },[]);
    const login = async(email, password) => {
        setLoading(true);
        const response = await userAuth.login(email, password);
        if (response.success) {
            setUser(response.data);
            setToken(response.data.accessToken);
            await EncryptedStorage.setItem('token', response.data.accessToken);
            setAuthenticated(true);
            setLoading(false);
        }
        else {
            setLoading(false);
            setAuthenticated(false);
        }

    };

    const logout  = async () => {
       await EncryptedStorage.removeItem('token');
        setUser(null);
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, authenticated, loading, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};