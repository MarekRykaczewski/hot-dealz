import { useState } from "react"
import Nav from "./pages/Nav"
import Home from "./pages/Home/Home"
import SignUpModal from './pages/SignUpModal'
import SignInModal  from './pages/SignInModal'
import { AuthContextProvider } from "./context/AuthContext"
import { Routes, Route } from "react-router-dom"
import Settings from "./pages/Settings/Settings"
import Profile from "./pages/Profile/Profile"
import Submission from "./pages/Submission/Submission"

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
      </Route>
      {/* <Route path="/deal/:id" element={<DealDetails />}/>  */}
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
