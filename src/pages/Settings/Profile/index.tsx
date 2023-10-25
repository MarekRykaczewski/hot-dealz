import React, { useState, ChangeEvent } from "react";
import ProfileUsername from "./ProfileUsername";
import ProfileEmail from "./ProfileEmail";
import ProfilePassword from "./ProfilePassword";
import ProfileConfirmDeleteModal from "./ProfileConfirmDeleteModal";
import ProfileUploadImage from "./ProfileUploadImage";

function Profile() {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profileURL, setProfileURL] = useState<string>("");

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col">
      <ProfileConfirmDeleteModal
        open={deleteAccountModal}
        onClose={() => setDeleteAccountModal(false)}
      />
      <span className="text-2xl mb-6">Profile</span>
      <ProfileUploadImage
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
        handleImageUpload={handleImageUpload}
        setProfileURL={setProfileURL}
      />
      <ProfileUsername />
      <ProfileEmail />
      <ProfilePassword />
      <hr className="mb-10"></hr>
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div className="flex flex-col md:mr-10">
          <span className="font-bold">delete account</span>
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => setDeleteAccountModal(true)}
            className="self-center py-1 text-red-700 border border-red-700 rounded-2xl pl-4 pr-4 md:pl-10 md:pr-10"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
