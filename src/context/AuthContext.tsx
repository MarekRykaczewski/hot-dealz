import {
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db, storage } from "../config/firebase";

export interface UserData {
  profileUrl?: string;
  username?: string;
  saved?: string[];
}

interface AuthContextType {
  createUser: (email: string, password: string) => Promise<UserCredential>;
  deleteUserAccount: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  user: FirebaseUser | null;
  userData: UserData;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData>({});

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const deleteUserAccount = async () => {
    if (!auth.currentUser) return;
    try {
      // Delete the user's account
      await deleteUser(auth.currentUser);
      console.log("User account deleted successfully.");
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setUserData({});
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userDataFromFirestore = docSnap.data() as UserData;

        // Load the image here
        const imageRef = ref(storage, `profileImages/${user.uid}/image`);
        const imageUrl = await getDownloadURL(imageRef);

        // Update userData with the image URL
        setUserData({ ...userDataFromFirestore, profileUrl: imageUrl });
      } catch (err) {
        console.log(err);
        setUserData({});
      }
    };
    fetchData();
  }, [user]);

  return (
    <UserContext.Provider
      value={{ createUser, deleteUserAccount, user, userData, logout, signIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserAuth must be used within an AuthContextProvider");
  }
  return context;
};
