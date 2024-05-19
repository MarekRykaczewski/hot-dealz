import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAuth } from "../../context/AuthContext";

interface NavSubmitProps {
  isFocused: boolean;
}

const NavSubmit: React.FC<NavSubmitProps> = ({ isFocused }) => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/submission");
    } else {
      toast.error("You must be logged in to submit a new deal.");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex ${
        isFocused && "hidden sm:flex"
      } sm:w-fit gap-0 sm:gap-1 p-2 w-10 font-semibold items-center justify-center rounded-full bg-orange-500 transition-all hover:bg-orange-400 duration-200 h-10 text-white`}
    >
      <AiOutlinePlusCircle size={30} />
      <span className="hidden sm:inline">Submit</span>
    </button>
  );
};
export default NavSubmit;
