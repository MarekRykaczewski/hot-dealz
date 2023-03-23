import { useState } from "react"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import SignUpModal from './components/SignUpModal'
import SignInModal  from './components/SignInModal'
import { AuthContextProvider } from "./context/AuthContext"
import { Routes, Route } from "react-router-dom"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"

function App() {

  const [openSignIn, setOpenSignIn] = useState(false)
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openNavAccountMenu, setOpenNavAccountMenu] = useState(false)
  
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

  const toggleNavAccountMenu = () => {
    setOpenNavAccountMenu(!openNavAccountMenu)
  }

  return (
  <div>
  <AuthContextProvider>
  <Nav 
    toggleSignInModal={toggleSignInModal}
    openNavAccountMenu={openNavAccountMenu}
    toggleNavAccountMenu={toggleNavAccountMenu}
   />
    <Routes> 
      <Route path='/' element={<Home />} />
      <Route path='/settings' element={<Settings />}>
        <Route path='/settings/profile' element={<Profile />}/>
      </Route>
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
