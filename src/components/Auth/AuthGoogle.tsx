import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import usernameExists from "../../api/firebase/users/usernameExists";
import { db } from "../../config/firebase";

interface AuthGoogleProps {
  username?: string;
  onClose: () => void;
}

const AuthGoogle: React.FC<AuthGoogleProps> = ({ onClose, username }) => {
  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user is a new user (just signed up)
      const isNewUser =
        user.metadata.creationTime === user.metadata.lastSignInTime;

      if (isNewUser) {
        const newUsername = username || user.displayName;

        const isUsernameTaken = await usernameExists(newUsername!);

        if (isUsernameTaken) {
          toast.warning(
            "Username is already taken. Please choose a different username."
          );
          return;
        }

        // Create a document in the "users" collection for the new user
        await setDoc(doc(db, "users", user.uid), {
          username: newUsername,
          createdAt: serverTimestamp(),
        });
      }

      onClose();
      toast.success("Google login successful!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full shadow border border-blue-200 hover:shadow-lg transition-all duration-100 flex items-center justify-center gap-2 bg-white text-blue-500 font-medium rounded-lg py-2.5 text-sm mt-4"
    >
      <FcGoogle color="black" size={20} />
      <span>Continue with Google</span>
    </button>
  );
};

export default AuthGoogle;
