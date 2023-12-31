import { User } from "firebase/auth";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import AuthModal from "../Auth/AuthModal";
import NavAccountMenu from "./NavAccountMenu";
import NavSearchBar from "./NavSearchBar";
import { PiFireSimpleFill } from "react-icons/pi";
import { getProfileUrlFromUserId } from "../../api/firebase/users";

interface NavProps {
  openNavAccountMenu: boolean;
  toggleNavAccountMenu: () => void;
}

const Nav: FunctionComponent<NavProps> = ({
  openNavAccountMenu,
  toggleNavAccountMenu,
}) => {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const { user }: { user: User | null } = UserAuth();
  const [scrollingDown, setScrollingDown] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setScrollingDown(currentScrollY > lastScrollY);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleUserButtonClick = () => {
    if (user) {
      toggleNavAccountMenu();
    } else {
      setOpenAuthModal(true);
    }
  };

  useEffect(() => {
    const fetchProfileUrl = async () => {
      try {
        const url = await getProfileUrlFromUserId(user.uid);
        setProfileImageUrl(url);
      } catch (error) {
        console.error("Error fetching profile image URL:", error);
      }
    };

    fetchProfileUrl();
  }, [user]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-gradient-to-r from-slate-700 to-slate-800 px-2 sm:px-6 py-2 shadow-md transition-all duration-300 ${
          scrollingDown ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex flex-row max-w-[75em] ml-auto mr-auto sm:flex-row sm:items-center items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center sm:justify-between w-full">
            <Link
              to="/"
              className="flex items-center flex-shrink-0 text-white gap-1"
            >
              <PiFireSimpleFill fontSize="2.5em" color="#f97316" />
              <span className="font-semibold text-2xl tracking-tight">
                Hot Dealz
              </span>
            </Link>
            <div className="flex gap-2 h-10 items-center">
              <NavSearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
              <button
                ref={profileRef}
                className={`${!user && "p-0 sm:w-48 w-10"} ${
                  isFocused && "hidden sm:flex"
                } h-10 w-10 relative gap-1 font-semibold flex items-center justify-center rounded-full bg-slate-500 transition-all text-white hover:bg-slate-400 duration-200`}
                onClick={handleUserButtonClick}
              >
                {user ? (
                  <img
                    src={profileImageUrl}
                    alt="User Profile"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                ) : (
                  <div className="flex items-center gap-1">
                    <BiUserCircle size={30} />
                    <span className="hidden sm:inline">Sign In / Register</span>
                  </div>
                )}
                {openNavAccountMenu && (
                  <NavAccountMenu
                    profileRef={profileRef}
                    openNavAccountMenu={openNavAccountMenu}
                    toggleNavAccountMenu={toggleNavAccountMenu}
                  />
                )}
              </button>
              <Link to="/submission">
                <button
                  className={`flex ${
                    isFocused && "hidden sm:flex"
                  } sm:w-fit gap-0 sm:gap-1 p-2 w-10 font-semibold items-center justify-center rounded-full bg-orange-500 transition-all hover:bg-orange-400 duration-200 h-10 text-white`}
                >
                  <AiOutlinePlusCircle size={30} />

                  <span className="hidden sm:inline">Submit</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  );
};

export default Nav;
