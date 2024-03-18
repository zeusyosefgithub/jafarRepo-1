'use client';
import { useContext,createContext,useState,useEffect } from "react";
import { signInWithPopup,signOut,onAuthStateChanged,GoogleAuthProvider } from "firebase/auth";
import { auth, firestore } from "./firebase";
import GetTrucks from "../Componenets/getDocs";
import { collection, getDocs } from "firebase/firestore";
import { Spinner } from "@nextui-org/react";
const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');

    const googleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then(async() => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "invoices"));
            }
            catch (e) {
                console.log(e);
                signOut(auth);
                setError('الحساب الذي سجل الدخول لايملك اي صلاحية للدخول !!');
            }
        });
        setLoading(false);
    }

    const logOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    },[user])
    
    return (
        <AuthContext.Provider value={{user,googleSignIn,logOut,error}}>{loading ? <Spinner className="absolute left-0 top-0 right-0 bottom-0"/> : children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}