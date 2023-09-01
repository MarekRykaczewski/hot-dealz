import { useState } from "react"
import Nav from "./pages/Nav/Nav"
import Home from "./pages/Home/Home"
import SignUpModal from './pages/SignUpModal'
import SignInModal  from './pages/SignInModal'
import { AuthContextProvider } from "./context/AuthContext"
import { Routes, Route } from "react-router-dom"
import Settings from "./pages/Settings/Settings"
import Profile from "./pages/Settings/Profile/Profile"
import Submission from "./pages/Submission/Submission"
import Preferences from "./pages/Settings/Preferences/Preferences"
import About from "./pages/Home/About"

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
      <Route path='*' element={<Home />} />
      <Route path='/submission' element={<Submission />}/>
      <Route path='/settings' element={<Settings />}>
        <Route path='/settings/profile' element={<Profile />}/>
        <Route path='/settings/preferences' element={<Preferences />}/>
      </Route>
      <Route path='/about' element={<About />} />
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
