import { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api/firebase/firestore";

interface Category {
  title: string;
}

function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);

  const ref = useRef<HTMLDivElement | null>(null);

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    fetchData();
  }, []);

  const items = categories.map((item) => (
    <Link
      className="w-fit"
      key={item.title}
      to={`/category/${encodeURIComponent(item.title)}`}
    >
      <button className="flex text-md leading-6 gap-1 h-10 min-w-fit w-[150px] px-2 items-center justify-center bg-slate-600 rounded-lg text-white font-semibold hover:bg-slate-500 transition">
        {item.title}
      </button>
    </Link>
  ));

  const onScrollLeftClick = () => scroll(-150);
  const onScrollRightClick = () => scroll(150);

  return (
    <div className="bg-slate-900 py-3 w-full">
      <div className="flex items-center justify-center max-w-[80em] ml-auto mr-auto">
        <button
          onClick={onScrollLeftClick}
          id="slideLeft"
          className="flex item-center justify-center p-2"
        >
          <AiFillCaretLeft fontSize="1.5em" className="text-slate-500" />
        </button>
        <div
          ref={ref}
          id="carouselContainer"
          className="flex flex-row w-fit overflow-x-hidden scroll-smooth gap-4 p-1"
        >
          {items}
        </div>
        <button
          onClick={onScrollRightClick}
          id="slideRight"
          className="flex item-center justify-center p-2"
        >
          <AiFillCaretRight fontSize="1.5em" className="text-slate-500" />
        </button>
      </div>
    </div>
  );
}

export default CategoryCarousel;
