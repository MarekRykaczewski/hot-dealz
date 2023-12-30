import React, { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
import { Link } from "react-router-dom";

type FooterNavProps = {
  paginate: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

const FooterNav: React.FC<FooterNavProps> = ({
  paginate,
  currentPage,
  totalPages,
}) => {
  const [showFooter, setShowFooter] = useState(false);
  const [showFooterDetails, setShowFooterDetails] = useState(false);

  const toggleFooter = () => {
    setShowFooterDetails(!showFooterDetails);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled down a certain amount
      const shouldShowFooter =
        window.scrollY > 200 || currentPage === totalPages;

      setShowFooter(shouldShowFooter);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  return (
    <div
      className={`sticky mt-auto bottom-0 w-full bg-white border-t-2 border-gray-300 transition-opacity duration-300 ease-in-out ${
        showFooter || showFooterDetails
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex text-sm sm:text-lg font-semibold text-slate-600 items-center justify-center py-2 px-4 sm:py-4 sm:px-8">
        <button
          className="w-1/4 hover:text-orange-500 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Go to top
        </button>
        <div>
          <nav>
            <ul className="flex w-1/2">
              <li>
                <button
                  className={`h-10 w-10 text-orange-500 transition`}
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                >
                  1 ...
                </button>
              </li>
              <li>
                <button
                  className={`h-10 w-5 sm:w-10 text-2xl text-slate-600 hover:bg-slate-200 rounded-2xl transition`}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
              </li>
              <li>
                <button
                  className={`h-10 w-16 sm:w-24 text-slate-600`}
                  onClick={() => paginate(currentPage)}
                  disabled={true}
                >
                  Page {currentPage}
                </button>
              </li>
              <li>
                <button
                  className={`h-10 w-5 sm:w-10 text-2xl text-slate-600 transition hover:bg-slate-200 rounded-2xl`}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </li>
              <li>
                <button
                  className={`h-10 w-10 text-orange-500 transition`}
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  ... {totalPages}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <button className="w-1/4" onClick={toggleFooter}>
          {showFooterDetails ? "Hide" : "Show"}
        </button>
      </div>
      {showFooterDetails && (
        <div className="flex flex-col items-center p-4 text-white bg-slate-700">
          <div className="mb-4">
            <h1 className="text-xl font-bold">
              👋 Hey, welcome to the newest online shopping social media!
            </h1>
            <p>Join now to share your expertise, tips, and advice</p>
          </div>
          <div className="flex flex-row font-bold justify-start gap-5">
            <div>
              <Link to={"/"}>About</Link>
            </div>
            <div>
              <button>Contact us</button>
            </div>
            <div className="border"></div>
            <div>
              <span>Follow us</span>
              <div className="flex items-center justify-center gap-3">
                <button>
                  <AiFillFacebook size={20} />
                </button>
                <button>
                  <AiFillYoutube size={20} />
                </button>
                <button>
                  <AiFillTwitterCircle size={20} />
                </button>
                <button>
                  <AiFillInstagram size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterNav;
