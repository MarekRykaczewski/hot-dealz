import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth'
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "../config/firebase";
import { getDownloadURL, ref } from 'firebase/storage';


const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [userData, setUserData] = useState({})

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

                // Load the image here
                const imageRef = ref(storage, `profileImages/${user.uid}/image`)                
                const imageUrl = await getDownloadURL(imageRef);
                
                setUserData(prevUserData => ({
                    ...prevUserData,
                    profileUrl: imageUrl
                }));

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