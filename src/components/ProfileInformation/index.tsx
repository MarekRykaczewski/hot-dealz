export const ProfileInformation = ({
  username,
  profilePictureUrl,
  creationDate,
}) => (
  <div className="bg-white h-full flex items-center justify-center p-4 rounded-lg shadow-md">
    <div className="flex flex-col items-center">
      <img
        src={profilePictureUrl}
        alt={`${username}'s Profile Picture`}
        className="w-32 h-32 rounded-full mb-3"
      />
      <h2 className="text-3xl font-bold">{username}</h2>
      <p className="text-gray-600">
        Member since {creationDate?.toLocaleDateString()}
      </p>
    </div>
  </div>
);
