import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineFileText } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiHotspotLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { getProfileUrlFromUserId } from "../../api/firebase/users";
import { calculateUserStatistics } from "../../api/firebase/users/calculateUserStatistics";
import getUserCreationDate from "../../api/firebase/users/getUserCreationDate";
import getUserIdFromUsername from "../../api/firebase/users/getUserIdFromUsername";
import FooterNav from "../../components/Footer";
import { ProfileInformation } from "../../components/ProfileInformation";
import { UserDeals } from "../../components/UserDeals";
import { UserStatistics } from "../../components/UserStatistics";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import usePagination from "../../hooks/usePagination";
import { useUserDeals } from "../../hooks/useUserDeals";
import { createDealCard } from "../../utilities/dealsUtils";

const UserProfile = () => {
  const { username } = useParams();

  const [userId, setUserId] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState();
  const [creationDate, setCreationDate] = useState(null);
  const [userStatistics, setUserStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreationDate = async () => {
      try {
        const userCreationDate = await getUserCreationDate(userId);
        setCreationDate(userCreationDate ? userCreationDate.toDate() : null);
      } catch (error) {
        console.error("Error fetching user creation date:", error);
      }
    };

    fetchCreationDate();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultUserId = await getUserIdFromUsername(username);
        setUserId(resultUserId);

        const profileImageUrl = await getProfileUrlFromUserId(resultUserId);
        setProfilePictureUrl(profileImageUrl);

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

  const { userDeals } = useUserDeals(userId);

  const { currentPage, currentItems, totalPages, paginate } = usePagination(
    userDeals,
    3
  );

  const dealElements = currentItems.map((item) => createDealCard(item));

  if (loading) {
    return <LoadingSpinner />;
  }

  const statisticsData = [
    {
      icon: <AiOutlineFileText size={30} className="text-gray-400" />,
      label: "Number of Posts",
      value: userStatistics ? userStatistics.numberOfDeals : 0,
    },
    {
      icon: <RiHotspotLine size={30} className="text-gray-400" />,
      label: "Hottest Deal",
      value: userStatistics ? userStatistics.hottestDeal : 0,
    },
    {
      icon: <AiFillStar size={30} className="text-gray-400" />,
      label: "Average Deal Rating",
      value: userStatistics ? userStatistics.averageTotalScore : 0,
    },
    {
      icon: <FaRegComment size={30} className="text-gray-400" />,
      label: "Number of Comments",
      value: userStatistics ? userStatistics.totalComments : 0,
    },
  ];

  return (
    <>
      <div className="sm:max-w-[70vw] w-full p-4 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileInformation
          username={username}
          profilePictureUrl={profilePictureUrl || null}
          creationDate={creationDate}
        />
        <UserStatistics statisticsData={statisticsData} />
        <UserDeals dealElements={dealElements} />
      </div>

      <FooterNav
        paginate={paginate}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default UserProfile;
