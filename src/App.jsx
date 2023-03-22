import { useState } from "react"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import SignUpModal from './components/SignUpModal'
import SignInModal  from './components/SignInModal'
import { AuthContextProvider } from "./context/AuthContext"
import { Routes, Route } from "react-router-dom"
import Account from "./pages/Account"

function App() {

  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  
  const toggleSignInModal = () => {
    setOpenSignIn(!openSignIn)
    if (openSignUp) {
      setOpenSignUp(false)
    }
  }

  const toggleSignUpModal = () => {
    setOpenSignUp(!openSignUp)
    if (openSignIn) {
      setOpenSignIn(false)
    }
  }

  return (
  <div>
  <AuthContextProvider>
  <Nav 
    toggleSignInModal={toggleSignInModal}
   />
    <Routes> 
      <Route path='/' element={<Home />} />
      <Route path='/account' element={<Account />} />
    </Routes>
  {openSignIn 
  && <SignInModal 
  toggleSignInModal={toggleSignInModal} 
  toggleSignUpModal={toggleSignUpModal} 
  />}
  {openSignUp && 
  <SignUpModal 
  toggleSignUpModal={toggleSignUpModal} 
  toggleSignInModal={toggleSignInModal} 
  />}
  </AuthContextProvider>
  </div>
  )
}

export default App
