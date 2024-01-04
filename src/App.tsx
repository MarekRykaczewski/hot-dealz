import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Nav/Nav";
import PrivateRoute from "./components/ui/PrivateRoute";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import DealDetails from "./pages/Home/[id]";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/Profile";
import Saved from "./pages/Saved";
import Settings from "./pages/Settings";
import Profile from "./pages/Settings/Profile";
import Submission from "./pages/Submission";

function App() {
  const [openNavAccountMenu, setOpenNavAccountMenu] = useState<boolean>(false); // Add the type for useState

  const toggleNavAccountMenu = () => {
    setOpenNavAccountMenu(!openNavAccountMenu);
  };

  return (
    <>
      <AuthContextProvider>
        <Nav
          openNavAccountMenu={openNavAccountMenu}
          toggleNavAccountMenu={toggleNavAccountMenu}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<UserProfile />} />
          <Route element={<PrivateRoute />}>
            <Route path="/submission" element={<Submission />} />
            <Route path="/settings" element={<Settings />}>
              <Route path="/settings/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/search/:query" element={<Home />} />
          <Route path="/saved/" element={<Saved />} />
          <Route path="/category/:category" element={<Home />} />
          <Route path="/deal/:dealId" element={<DealDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
