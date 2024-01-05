import { User } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { getProfileUrlFromUserId } from "../../api/firebase/users";
import { UserAuth } from "../../context/AuthContext";
import AuthModal from "../Auth";
import AccountMenu from "./AccountMenu";

interface NavUserProps {
  isFocused: boolean;
  toggleNavAccountMenu: () => void;
  openNavAccountMenu: () => void;
}

const NavUser: React.FC<NavUserProps> = ({
  isFocused,
  openNavAccountMenu,
  toggleNavAccountMenu,
}) => {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  const profileRef = useRef<HTMLButtonElement>(null);
  const { user }: { user: User | null } = UserAuth();

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
        if (user) {
          const url = await getProfileUrlFromUserId(user.uid);
          setProfileImageUrl(url);
        }
      } catch (error) {
        console.error("Error fetching profile image URL:", error);
      }
    };

    fetchProfileUrl();
  }, [user]);

  return (
    <>
      <button
        ref={profileRef}
        className={`${!user && "p-0 sm:w-48 w-10"} ${
          isFocused && "hidden sm:flex"
        } h-10 w-10 relative gap-1 font-semibold flex items-center justify-center rounded-full bg-slate-500 transition-all text-white hover:bg-slate-400 duration-200`}
        onClick={handleUserButtonClick}
      >
        {user ? (
          <img
            src={profileImageUrl || "/placeholderAvatar.png"}
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
          <AccountMenu
            profileRef={profileRef}
            openNavAccountMenu={openNavAccountMenu}
            toggleNavAccountMenu={toggleNavAccountMenu}
          />
        )}
      </button>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  );
};

export default NavUser;
