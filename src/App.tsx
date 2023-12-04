import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Profile from "./pages/Settings/Profile";
import Submission from "./pages/Submission";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [openNavAccountMenu, setOpenNavAccountMenu] = useState<boolean>(false); // Add the type for useState

  const toggleNavAccountMenu = () => {
    setOpenNavAccountMenu(!openNavAccountMenu);
  };

  return (
    <div>
      <AuthContextProvider>
        <Nav
          openNavAccountMenu={openNavAccountMenu}
          toggleNavAccountMenu={toggleNavAccountMenu}
        />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/submission" element={<Submission />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="/settings/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
