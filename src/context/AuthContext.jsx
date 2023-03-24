import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth'
import { auth, db } from "../config/firebase";
import { getDocs, query, doc, getDoc } from "firebase/firestore";

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [userData, setUserData] = useState([])

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, "users", user.uid)
                const docSnap = await getDoc(docRef)
                setUserData(docSnap.data())
            } catch(err) {
                if (userData) {
                    return
                } else {
                    console.log(err)
                }
            }
        }
        fetchData()
    }, [user])

    return (
        <UserContext.Provider value={{ createUser, user, userData, logout, signIn }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}