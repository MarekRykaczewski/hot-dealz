import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

interface NavSubmitProps {
  isFocused: boolean;
}

const NavSubmit: React.FC<NavSubmitProps> = ({ isFocused }) => (
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
);

export default NavSubmit;
