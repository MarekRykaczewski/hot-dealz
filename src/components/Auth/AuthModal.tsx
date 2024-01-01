import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../config/firebase";
import { UserAuth } from "../../context/AuthContext";
import Modal from "../Modal";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

function AuthModal({ open, onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [signUpMode, setSignUpMode] = useState(false);

  const { signIn, createUser } = UserAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      onClose();
      toast.success("Login successful!");
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
      toast.error("Incorrect email or password.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await createUser(email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        username: username,
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.warning("Please provide your email to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(getAuth(), email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (e: any) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex sm:flex-row flex-col w-full gap-3 sm:gap-6">
        <div className="flex flex-1 flex-col justify-center items-center bg-slate-800 p-4 rounded-lg text-white w-full">
          <h3 className="text-3xl font-medium mb-4 text-center">
            Welcome to Hot Dealz
          </h3>
          <p className="text-sm text-gray-500">
            {signUpMode ? "Already registered? " : "Not registered? "}
            <a
              onClick={() => setSignUpMode(!signUpMode)}
              className="text-orange-700 hover:underline"
            >
              {signUpMode ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>

        <form
          className="w-full bg-white sm:py-6 rounded-b-lg"
          onSubmit={signUpMode ? handleSignUp : handleSignIn}
          action="#"
        >
          <h3 className="text-xl font-medium mb-4">
            Sign {signUpMode ? "up" : "in"} to Hot Dealz
          </h3>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              Your email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="name@email.com"
              required
            />
          </div>
          {signUpMode && (
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-900 text-sm font-medium mb-2"
              >
                Your username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="JohnSmith"
                required
              />
            </div>
          )}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-900 text-sm font-medium mb-2"
            >
              Your password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label
              htmlFor="remember"
              className="flex items-center text-gray-900 text-sm font-medium"
            >
              <input id="remember" type="checkbox" className="mr-2" />
              Remember me
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-orange-700 text-sm hover:underline"
            >
              Lost Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-lg py-2.5 text-sm"
          >
            {signUpMode ? "Register" : "Login to your account"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AuthModal;
