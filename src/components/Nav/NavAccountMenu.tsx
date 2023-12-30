import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

interface NavAccountMenuProps {
  openNavAccountMenu: boolean;
  toggleNavAccountMenu: () => void;
  profileRef: React.RefObject<HTMLDivElement>;
}

const NavAccountMenu: React.FC<NavAccountMenuProps> = ({
  openNavAccountMenu,
  toggleNavAccountMenu,
  profileRef,
}) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        toggleNavAccountMenu();
      }
    };

    if (openNavAccountMenu) {
      document.addEventListener("click", handleOutsideClick, true);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [openNavAccountMenu, profileRef, toggleNavAccountMenu]);

  const { logout, userData } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate("/");
    });
  };

  const menuItems = [
    {
      label: "Settings",
      to: "/settings/profile",
      hoverClass: "hover:bg-gray-100",
    },
    { label: "My saved", to: "/saved/", hoverClass: "hover:bg-gray-100" },
    {
      label: "Sign out",
      onClick: handleLogout,
      hoverClass: "hover:bg-gray-100",
    },
  ];

  return (
    <div className="flex flex-col z-10 absolute top-12 bg-white divide-y divide-gray-100 rounded-lg shadow sm:w-[250px]">
      <div className="px-4 py-3 w-full text-white bg-orange-500 rounded-t-lg">
        <div className="text-md">{userData.username}</div>
      </div>
      <ul className="flex w-full flex-col  text-md text-gray-700">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={index < menuItems.length - 1 ? "border-b" : ""}
          >
            {item.to ? (
              <Link
                onClick={toggleNavAccountMenu}
                to={item.to}
                className={`block px-4 py-3 w-full ${item.hoverClass}`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                onClick={item.onClick}
                className={`block px-4 py-3 w-full ${item.hoverClass}`}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavAccountMenu;
