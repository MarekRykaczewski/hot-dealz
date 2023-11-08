import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { storage } from "../../../config/firebase";
import { UserAuth } from "../../../context/AuthContext";

interface ProfileUploadImageProps {
  profilePicture: File | null;
  setProfilePicture: React.Dispatch<React.SetStateAction<File | null>>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProfileURL: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileUploadImage: React.FC<ProfileUploadImageProps> = ({
  profilePicture,
  setProfilePicture,
  handleImageUpload,
  setProfileURL,
}) => {
  const [editing, setEditing] = useState(false);

  const { user, userData } = UserAuth();

  useEffect(() => {
    if (profilePicture) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [profilePicture]);

  const handleSaveImage = async () => {
    try {
      const imageRef = ref(storage, `profileImages/${user?.uid}/image`);
      await uploadBytes(imageRef, profilePicture as File);

      const url = await getDownloadURL(imageRef);
      setProfileURL(url);

      setProfilePicture(null);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-between mb-10">
      <div className="flex flex-col md:mr-10">
        <span className="font-bold"> Your profile picture </span>
        <span> Optional </span>
      </div>
      <div className="flex flex-col">
        <img
          src={
            profilePicture
              ? URL.createObjectURL(profilePicture)
              : userData.profileUrl
          }
          className="mb-4 self-center max-w-[200px] h-[200px] bg-slate-600"
          alt="Profile Picture"
        />
        {!editing && (
          <div className="flex flex-col w-max-[300px]">
            <label
              htmlFor="profilePic"
              className="text-center self-center py-1 border rounded-2xl pl-4 pr-4 md:pl-10 md:pr-10 hover:bg-gray-100 hover:text-orange-500 transition"
            >
              Upload
            </label>
            <input
              onChange={handleImageUpload}
              className="hidden"
              id="profilePic"
              type="file"
            />
          </div>
        )}
        {editing && (
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setProfilePicture(null)}
              className="text-center self-center py-1 border rounded-2xl pl-4 pr-4 md:pl-10 md:pr-10 hover:bg-gray-100 hover:text-orange-500 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveImage}
              className="text-center self-center py-1 border rounded-2xl pl-4 pr-4 md:pl-10 md:pr-10 hover-bg-gray-100 hover-text-orange-500 transition"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileUploadImage;
