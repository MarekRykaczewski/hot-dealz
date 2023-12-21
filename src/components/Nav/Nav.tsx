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

  return (
    <>
      <nav
        className={`sticky top-0 z-50 bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-2 shadow-md transition-all duration-300 ${
          scrollingDown ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="max-w-[75em] ml-auto mr-auto flex sm:flex-row flex-row sm:items-center gap-3 items-center justify-between">
          <div className="flex flex-row flex-wrap gap-3 items-center justify-between w-full">
            <Link
              to="/"
              className="flex items-center flex-shrink-0 text-white gap-1"
            >
              <PiFireSimpleFill fontSize="2.5em" color="#f97316" />
              <span className="font-semibold text-2xl tracking-tight">
                Hot Dealz
              </span>
            </Link>
            <NavSearchBar />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              ref={profileRef}
              className="flex-1 relative p-2 gap-2 font-semibold flex items-center justify-center rounded-full bg-slate-500 transition-all text-white hover:bg-slate-400 duration-200 h-10 w-[12rem]"
              onClick={
                user ? toggleNavAccountMenu : () => setOpenAuthModal(true)
              }
            >
              <BiUserCircle size={30} />
              <span className="flex-1">Sign In / Register</span>
              {openNavAccountMenu && (
                <NavAccountMenu
                  profileRef={profileRef}
                  openNavAccountMenu={openNavAccountMenu}
                  toggleNavAccountMenu={toggleNavAccountMenu}
                />
              )}
            </button>

            <Link
              className="flex p-2 gap-1 font-semibold items-center justify-center rounded-3xl bg-orange-500 transition-all hover:bg-orange-400 duration-200 h-10 w-fit text-white"
              to="/submission"
            >
              <AiOutlinePlusCircle size={30} />
              <span>Submit</span>
            </Link>
          </div>
        </div>
      </nav>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  );
};

export default Nav;
