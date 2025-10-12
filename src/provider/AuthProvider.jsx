import React, { useEffect, useState } from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import { AuthContext } from '../context/AuthContext';
import { auth } from '../../firebase.config';


const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUSer = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const updateUserProfile = (profileInfo) => {
        return updateProfile(auth.currentUser, profileInfo);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, currUser => {
            setUser(currUser);
            console.log('user in the authStateChange',currUser);
            
            setLoading(false);
        });

        return () => {
            unSubcribe();
        }
    }, []);


    const authInfo = {
        user,
        createUser,
        signInUSer,
        signInGoogle,
        updateUserProfile,
        logOut,
        loading,
        setLoading,
    }

    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;