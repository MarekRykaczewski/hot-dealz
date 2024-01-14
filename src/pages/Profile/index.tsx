import { AiFillStar, AiOutlineFileText } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiHotspotLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import FooterNav from "../../components/Footer";
import { ProfileInformation } from "../../components/ProfileInformation";
import UserDeals from "../../components/UserDeals";
import UserStatistics from "../../components/UserStatistics";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import usePagination from "../../hooks/usePagination";
import { useUserDeals } from "../../hooks/useUserDeals";
import useUserProfileData from "../../hooks/useUserProfileData";
import { DEFAULT_PROFILE_IMAGE_URL } from "../../utilities/constants";
import { createDealCard } from "../../utilities/dealsUtils";
import { StatisticItem } from "../../types";

const UserProfile = () => {
  const { username } = useParams();
  const { userId, profilePictureUrl, creationDate, userStatistics, loading } =
    useUserProfileData(username!);

  const { userDeals } = useUserDeals(userId!);

  const { currentPage, currentItems, totalPages, paginate } = usePagination(
    userDeals,
    3
  );

  const dealElements = currentItems.map((item) => createDealCard(item));

  if (loading) {
    return <LoadingSpinner />;
  }

  const statisticsData: StatisticItem[] = [
    {
      icon: <AiOutlineFileText size={25} className="text-gray-600" />,
      label: "Posts",
      value: userStatistics ? String(userStatistics.numberOfDeals) : "0",
    },
    {
      icon: <RiHotspotLine size={25} className="text-gray-600" />,
      label: "Hottest",
      value: userStatistics ? String(userStatistics.hottestDeal) : "0",
    },
    {
      icon: <AiFillStar size={25} className="text-gray-600" />,
      label: "Average",
      value: userStatistics ? String(userStatistics.averageTotalScore) : "0",
    },
    {
      icon: <FaRegComment size={25} className="text-gray-600" />,
      label: "Comments",
      value: userStatistics ? String(userStatistics.totalComments) : "0",
    },
  ];

  return (
    <>
      <div className="w-full gap-4">
        <div className="mb-4">
          <ProfileInformation
            username={username}
            profilePictureUrl={
              profilePictureUrl !== null
                ? profilePictureUrl
                : DEFAULT_PROFILE_IMAGE_URL
            }
            creationDate={creationDate!}
          />
        </div>
        <div className="flex sm:flex-row flex-col justify-center gap-4 mx-4">
          <div>
            <UserStatistics statisticsData={statisticsData} />
          </div>
          <div className="mb-4">
            <UserDeals dealElements={dealElements} />
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
