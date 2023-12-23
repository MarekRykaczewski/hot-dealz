import React, { ReactElement } from "react";
import CategoryCarousel from "../../components/CategoryCarousel";
import FooterNav from "../../components/Footer/FooterNav";
import Tabs from "../../components/Tabs";
import { Deal } from "../../types";

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
        {dealElements}
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
