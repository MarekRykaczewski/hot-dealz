import React from "react";
import { Link } from "react-router-dom";

interface ProfileLinkProps {
  owner: string;
  profileUrl: string;
}

const ProfileLink: React.FC<ProfileLinkProps> = ({ owner, profileUrl }) => {
  return (
    <Link
      to={`/profile/${owner}`}
      className="flex items-center justify-between gap-5"
    >
      <div className="flex justify-center items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src={profileUrl}
          alt="Profile"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">Shared by {owner}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProfileLink;
