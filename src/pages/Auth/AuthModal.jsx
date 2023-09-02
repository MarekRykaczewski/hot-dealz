import React, { useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import Modal from '../../components/Modal'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../config/firebase'

function AuthModal({ open, onClose }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [signUpMode, setSignUpMode] = useState(false)

  const { signIn, createUser } = UserAuth();

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    try {
        await signIn(email, password)
        onClose()
    } catch (e) {
        setError(e.message)
        console.log(e.message)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    try {
        const res = await createUser(email, password)
        await setDoc(doc(db, "users", res.user.uid), {
            username: username
        })
        onClose()
    } catch (e) {
        setError(e.message)
        console.log(e.message)
    }
}

  return (
<Modal open={open} onClose={onClose}>
  <div className='flex w-[500px] gap-10'>
    <div className="flex flex-1 flex-col justify-center items-center bg-slate-800 p-6 rounded-lg text-white w-full">
      <h3 className="text-3xl font-medium mb-4">Welcome to Hot Dealz</h3>
      <p className="text-sm text-gray-500">
        {signUpMode ? "Already registered? " : "Not registered? "}
          <a onClick={() => setSignUpMode(!signUpMode)} className="text-orange-700 hover:underline">
            {signUpMode ? "Sign in" : "Sign up"}
          </a>
      </p>
    </div>
    <div className="flex-1 w-full bg-white py-6 rounded-b-lg">
      <form onSubmit={signUpMode ? handleSignUp : handleSignIn} action="#">
        <h3 className="text-xl font-medium mb-4">Sign {signUpMode ? "up" : "in"} to Hot Dealz</h3>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900 text-sm font-medium mb-2">
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
        {signUpMode && <div className="mb-4">
          <label htmlFor="email" className="block text-gray-900 text-sm font-medium mb-2">
            Your username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            name="username"
            id="username"
            placeholder="JohnSmith"
            required
          />
        </div>}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-900 text-sm font-medium mb-2">
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
          <label htmlFor="remember" className="flex items-center text-gray-900 text-sm font-medium">
            <input
              id="remember"
              type="checkbox"
              className="mr-2"
            />
            Remember me
          </label>
          <a href="#" className="text-orange-700 text-sm hover:underline">
            Lost Password?
          </a>
        </div>
        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-lg py-2.5 text-sm">
          {signUpMode ? "Register" : "Login to your account"}
        </button>
      </form>
    </div>
  </div>
</Modal>
  )
}

export default AuthModal