import React from "react";
import { PiFireSimpleFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const NavLogo: React.FC = () => (
  <Link to="/" className="flex items-center flex-shrink-0 text-white gap-1">
    <PiFireSimpleFill fontSize="2.5em" color="#f97316" />
    <span className="font-semibold text-2xl tracking-tight">Hot Dealz</span>
  </Link>
);

export default NavLogo;
