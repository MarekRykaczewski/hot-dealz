interface ProfileInformationProps {
  username: string;
  profilePictureUrl: string;
  creationDate?: Date;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({
  username,
  profilePictureUrl,
  creationDate,
}) => (
  <div className="bg-white w-full h-full flex items-center justify-start p-4">
    <div className="flex mx-[20vw] gap-2 items-center">
      <img
        src={profilePictureUrl}
        alt={`${username}'s Profile Picture`}
        className="w-32 h-32 rounded-full mb-3"
      />
      <div>
        <h2 className="text-3xl font-bold">{username}</h2>
        <p className="text-gray-600">
          Member since {creationDate?.toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
);
