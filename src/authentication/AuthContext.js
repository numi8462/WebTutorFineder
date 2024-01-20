import React, { useContext, useState, useEffect } from "react";
import {auth} from './Firebase'

const AuthContext = React.createContext()

// export function useAuth() {
//     return useContext(AuthContext)
// }

export function useAuth() {
    const context = useContext(AuthContext);
   
    if (!context) {
       throw new Error('useAuth must be used within an AuthProvider');
    }
   
    return context;
   };

export function AuthProvider({ children }) {

    const [ currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState()

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            //return uid
            return user.uid;
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // Handle errors here
        });
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        console.log("Logout");
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {

            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    auth.onAuthStateChanged(user => {
        setCurrentUser(user)
    })
    
    const value = {
        currentUser,
        signUp,
        login,
        resetPassword,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}