import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineFileText } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiHotspotLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { getProfileUrlFromUserId } from "../../api/firebase/users";
import { calculateUserStatistics } from "../../api/firebase/users/calculateUserStatistics";
import getUserCreationDate from "../../api/firebase/users/getUserCreationDate";
import getUserIdFromUsername from "../../api/firebase/users/getUserIdFromUsername";
import FooterNav from "../../components/Footer/FooterNav";
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
        {/* Left side: Profile information and User Statistics */}
        <div className="col-span-1">
          {/* Profile information */}
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
        </div>
        {/* User Statistics */}
        <div className="col-span-1">
          <h3 className="text-2xl mb-4 h-fit shadow-md bg-white rounded-lg p-4 text-center font-semibold">
            Statistics
          </h3>

          <div className="bg-white flex items-center justify-center p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-2 gap-4">
              {statisticsData.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center mb-2"
                >
                  {icon}
                  <div className="flex flex-col items-center  gap-2">
                    <p className="text-gray-600">{label}</p>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Deals section */}
        <div className="sm:col-span-2">
          <h3 className="text-2xl bg-white rounded-lg p-4 shadow-md text-center font-semibold mb-4">
            User's Deals
          </h3>
          <div className="flex flex-col items-center justify-center gap-2">
            {dealElements}
          </div>
        </div>
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
