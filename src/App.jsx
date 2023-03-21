import { useState } from "react"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import SignUpModal from './components/SignUpModal'
import SignInModal  from './components/SignInModal'
import { AuthContextProvider } from "./context/AuthContext"

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
  <Home />
  </AuthContextProvider>
  </div>
  )
}

export default App
