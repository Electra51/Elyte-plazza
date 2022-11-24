import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider() 

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // const logIn = (email, password) =>{
    //     setLoading(true);
    //     return signInWithEmailAndPassword(auth, email, password);
    // }

    // const updateUser = (userInfo) =>{
    //     return updateProfile(auth.currentUser, userInfo);
    // }

    // const logOut = () =>{
    //     setLoading(true);
    //     return signOut(auth);
    // }

    // const resetPassword = email => {
    //     setLoading(true)
    //     return sendPasswordResetEmail(auth, email)
    // }
    
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
      }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('user observing');
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    const authInfo = {
        createUser,
        // logIn,
        // updateUser,
        // logOut,
        user,
        loading,
        // resetPassword,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;