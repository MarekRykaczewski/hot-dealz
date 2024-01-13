import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement } from "react";
import { cardAnimationVariant } from "../animations/cardAnimationVariant";
import CategoryCarousel from "../components/CategoryCarousel";
import FooterNav from "../components/Footer";
import Tabs from "../components/Tabs";
import { Deal } from "../types";

interface DealsProps {
  deals: Deal[];
  currentSorting?: "newest" | "comments";
  setCurrentSorting: React.Dispatch<React.SetStateAction<string>>;
  dealElements: ReactElement[];
  paginate: (pageNumber: number) => void;
  currentPage: number;
  totalPages: number;
}

function Deals({
  currentSorting,
  setCurrentSorting,
  dealElements,
  paginate,
  currentPage,
  totalPages,
}: DealsProps): ReactElement {
  return (
    <div className="h-screen flex flex-col justify-between">
      <CategoryCarousel />
      <div className="flex flex-col w-full h-full gap-2 items-center">
        <Tabs
          currentSorting={currentSorting}
          setCurrentSorting={setCurrentSorting}
        />
        <div className="max-w-[70rem] w-full">
          <AnimatePresence>
            <motion.div
              key={currentPage}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardAnimationVariant}
              className="flex w-full flex-col gap-2"
            >
              {dealElements}
            </motion.div>
          </AnimatePresence>
        </div>

        <FooterNav
          paginate={paginate}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default Deals;
