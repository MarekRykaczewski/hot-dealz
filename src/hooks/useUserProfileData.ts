import { useEffect, useState } from "react";
import { getProfileUrlFromUserId } from "../api/firebase/users";
import calculateUserStatistics from "../api/firebase/users/calculateUserStatistics";
import getUserCreationDate from "../api/firebase/users/getUserCreationDate";
import getUserIdFromUsername from "../api/firebase/users/getUserIdFromUsername";

interface UserProfileData {
  userId: string | null;
  profilePictureUrl?: string;
  creationDate: Date | null;
  userStatistics: UserStatistics | null;
  loading: boolean;
}

interface UserStatistics {
  numberOfDeals: number;
  totalComments: number;
  averageTotalScore: number;
  hottestDeal: number;
}
const useUserProfileData = (username: string): UserProfileData => {
  const [userId, setUserId] = useState<string | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<
    string | undefined
  >();
  const [creationDate, setCreationDate] = useState<Date | null>(null);
  const [userStatistics, setUserStatistics] = useState<UserStatistics | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultUserId: string | null = await getUserIdFromUsername(
          username
        );

        // Handle null case, return early or provide a default value
        if (resultUserId === null) {
          console.error("User ID is null.");
          return;
        }

        setUserId(resultUserId);

        const profileImageUrl = await getProfileUrlFromUserId(resultUserId);

        // Handle null case by setting it to undefined
        setProfilePictureUrl(profileImageUrl ? profileImageUrl : undefined);

        const userCreationDate = await getUserCreationDate(resultUserId);
        setCreationDate(userCreationDate ? userCreationDate.toDate() : null);

        const statistics = await calculateUserStatistics(resultUserId);
        setUserStatistics(statistics);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  return {
    userId,
    profilePictureUrl,
    creationDate,
    userStatistics,
    loading,
  };
};

export default useUserProfileData;
