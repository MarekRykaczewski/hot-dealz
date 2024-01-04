import React from "react";
import { Link } from "react-router-dom";

interface UserDetailsProps {
  username: string;
  profileUrl?: string;
  date: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  username,
  profileUrl,
  date,
}) => {
  return (
    <Link to={`/profile/${username}`} className="flex">
      {profileUrl && (
        <img
          className="self-start w-10 h-10 rounded-full mr-4"
          src={profileUrl}
          alt={`Avatar of ${username || "Anonymous"}`}
        />
      )}
      <div className="flex flex-col">
        <span>{username || "Anonymous"}</span>
        <span>{date}</span>
      </div>
    </Link>
  );
};

export default UserDetails;
