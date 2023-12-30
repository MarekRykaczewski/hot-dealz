import { FaRegComment } from "react-icons/fa";
import DealCard from "../../components/DealCard/DealCard";
import { AiOutlineFileText, AiFillStar } from "react-icons/ai";
import { RiHotspotLine } from "react-icons/ri";
import { useUserDeals } from "../../hooks/useUserDeals";
import LoadingSpinner from "../../components/LoadingSpinner";
import usePagination from "../../hooks/usePagination";
import FooterNav from "../../components/Footer/FooterNav";
import { useParams } from "react-router-dom";
import { getProfileUrlFromUserId } from "../../api/firebase/users";
import { useEffect, useState } from "react";
import getUserIdFromUsername from "../../api/firebase/users/getUserIdFromUsername";
import getUserCreationDate from "../../api/firebase/users/getUserCreationDate";
import { calculateUserStatistics } from "../../api/firebase/users/calculateUserStatistics";

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

  const dealElements = currentItems.map((item) => (
    <DealCard key={item.dealId} {...item} userId={userId} />
  ));

  if (loading) {
    return <LoadingSpinner />;
  }

  console.log("userStats", userStatistics);

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
      <div className="w-max-[70vw] w-fit p-4 mx-auto grid grid-cols-2 gap-4">
        {/* Left side: Profile information and User Statistics */}
        <div className="col-span-1">
          {/* Profile information */}
          <div className="bg-white flex items-center justify-center p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-4">
              <img
                src={profilePictureUrl}
                alt={`${username}'s Profile Picture`}
                className="w-20 h-20 rounded-full mr-4"
              />
              <div>
                <h2 className="text-3xl font-bold">{username}</h2>
                <p className="text-gray-600">
                  Member since {creationDate?.toLocaleDateString()}
                </p>
                {/* Add Message and Observe buttons */}
                <div className="flex mt-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                    Message
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md">
                    Observe
                  </button>
                </div>
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
        </div>

        {/* Right side: Deals section */}
        <div className="col-span-1 w-fit">
          <h3 className="text-2xl bg-white rounded-lg p-4 shadow-md text-center font-semibold mb-4">
            User's Deals
          </h3>
          <div className="flex flex-col w-fit items-center justify-center gap-2">
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
