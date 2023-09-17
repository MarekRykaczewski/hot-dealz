import { useState } from "react"
import Nav from "./components/Nav/Nav"
import Home from "./pages/Home"
import { AuthContextProvider } from "./context/AuthContext"
import { Routes, Route } from "react-router-dom"
import Settings from "./pages/Settings"
import Profile from "./pages/Settings/Profile"
import Submission from "./pages/Submission"

function App() {

  const [openNavAccountMenu, setOpenNavAccountMenu] = useState(false)
  
  const toggleNavAccountMenu = () => {
    setOpenNavAccountMenu(!openNavAccountMenu)
  }

  return (
  <div>
  <AuthContextProvider>
  <Nav 
    openNavAccountMenu={openNavAccountMenu}
    toggleNavAccountMenu={toggleNavAccountMenu}
   />
    <Routes> 
      <Route path='*' element={<Home />} />
      <Route path='/submission' element={<Submission />}/>
      <Route path='/settings' element={<Settings />}>
        <Route path='/settings/profile' element={<Profile />}/>
      </Route>
    </Routes>
  </AuthContextProvider>
  </div>
  )
}

export default App
