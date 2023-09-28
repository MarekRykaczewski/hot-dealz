import React, { useState } from 'react';
import { AiFillFacebook, AiFillYoutube, AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function FooterNav({ paginate, currentPage, totalPages }) {
  const [showFooter, setShowFooter] = useState(false);

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  return (
    <div className="sticky item mt-auto bottom-0 w-full bg-white border-t-2 border-gray-300">
      <div className="flex text-lg font-semibold text-slate-600 items-center justify-between py-4 px-8">
        <button className="hover:text-orange-500 transition" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Go to top
        </button>
        <div>
          <nav>
            <ul className="flex items-center justify-center">
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
                  className={`h-10 w-10 text-2xl text-slate-600 hover:bg-slate-200 rounded-2xl transition`}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
              </li>
              <li>
                <button
                  className={`h-10 w-24 text-slate-600`}
                  onClick={() => paginate(currentPage)}
                  disabled={true}
                >
                  Page {currentPage}
                </button>
              </li>
              <li>
                <button
                  className={`h-10 w-10 text-2xl text-slate-600 transition hover:bg-slate-200 rounded-2xl`}
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
        <button onClick={toggleFooter}>
          {showFooter ? 'Hide' : 'Show'}
        </button>
      </div>
      {showFooter && (
        <div className="flex flex-col items-center p-4 text-white bg-slate-700">
          <div className="mb-4">
            <h1 className="text-xl font-bold">👋 Hey, welcome to the newest online shopping social media!</h1>
            <p>Join now to share your expertise, tips, and advice</p>
          </div>
          <div className="flex flex-row font-bold justify-start gap-5">
            <div>
              <Link to={'/'}>About</Link>
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
}

export default FooterNav;
