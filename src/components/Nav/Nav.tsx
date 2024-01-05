import { FunctionComponent, useEffect, useState } from "react";
import NavLogo from "./NavLogo";
import NavSubmit from "./NavSubmit";
import NavUser from "./NavUser";
import NavSearchBar from "./SearchBar/SearchBar";

interface NavProps {
  openNavAccountMenu: boolean;
  toggleNavAccountMenu: () => void;
}

const Nav: FunctionComponent<NavProps> = ({
  openNavAccountMenu,
  toggleNavAccountMenu,
}) => {
  const [scrollingDown, setScrollingDown] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
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

  return (
    <nav
      className={`sticky top-0 z-50 bg-gradient-to-r from-slate-700 to-slate-800 px-2 sm:px-6 py-2 shadow-md transition-all duration-300 ${
        scrollingDown ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-row max-w-[75em] ml-auto mr-auto sm:flex-row sm:items-center items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center sm:justify-between w-full">
          <NavLogo />
          <div className="flex gap-2 h-10 items-center">
            <NavSearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
            <NavUser
              isFocused={isFocused}
              openNavAccountMenu={openNavAccountMenu}
              toggleNavAccountMenu={toggleNavAccountMenu}
            />
            <NavSubmit isFocused={isFocused} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
