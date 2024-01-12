import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import usernameExists from "../../api/firebase/users/usernameExists";
import { db } from "../../config/firebase";
import { UserAuth } from "../../context/AuthContext";
import FormField from "../ui/FormField";
import Modal from "../ui/Modal";
import AuthGoogle from "./AuthGoogle";
import WelcomeCard from "./WelcomeCard";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  username?: string;
  password: string;
  remember: boolean;
}

function AuthModal({ open, onClose }: AuthModalProps) {
  const [signUpMode, setSignUpMode] = useState(false);
  const { signIn, createUser } = UserAuth();
  const methods = useForm<FormData>();
  const { watch } = useForm<FormData>();
  const username = watch("username");

  const { handleSubmit, register } = methods;

  const handleSignIn = async (data: FormData) => {
    try {
      await signIn(data.email, data.password);
      onClose();
      toast.success("Login successful!");
    } catch (e: any) {
      toast.error("Incorrect email or password.");
    }
  };

  const handleSignUp = async (data: FormData) => {
    try {
      const isUsernameTaken = await usernameExists(data.username);

      if (isUsernameTaken) {
        toast.warning(
          "Username is already taken. Please choose a different username."
        );
        return;
      }

      const res = await createUser(data.email, data.password);
      await setDoc(doc(db, "users", res.user.uid), {
        username: data.username,
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!methods.getValues("email")) {
      toast.warning("Please provide your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(getAuth(), methods.getValues("email"));
      toast.success("Password reset email sent! Check your inbox.");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (signUpMode) {
      handleSignUp(data);
    } else {
      handleSignIn(data);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex sm:flex-row flex-col w-full gap-3 sm:gap-6">
        <WelcomeCard signUpMode={signUpMode} setSignUpMode={setSignUpMode} />
        <FormProvider {...methods}>
          <form
            className="w-full bg-white sm:py-6 rounded-b-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-xl font-medium mb-4">
              Sign {signUpMode ? "up" : "in"} to Hot Dealz
            </h3>

            <FormField
              label="Your email"
              name="email"
              type="email"
              placeholder="name@email.com"
              required
            />

            {signUpMode && (
              <FormField
                label="Your username"
                name="username"
                type="text"
                placeholder="JohnSmith"
                required
              />
            )}

            <FormField
              label="Your password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between mb-4">
              <label
                htmlFor="remember"
                className="flex items-center text-gray-900 text-sm font-medium"
              >
                <input
                  id="remember"
                  type="checkbox"
                  {...register("remember")}
                />
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
            <AuthGoogle onClose={onClose} username={username} />
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
}

export default AuthModal;
