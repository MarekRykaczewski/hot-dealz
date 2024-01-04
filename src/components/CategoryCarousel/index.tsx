import { useRef } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

function CategoryCarousel() {
  const { categories } = useCategories();

  const ref = useRef<HTMLDivElement | null>(null);

  const scroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  const items = categories.map((item) => (
    <Link
      className="flex-shrink-0 w-fit"
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
    <div className="bg-slate-900 py-3">
      <div className="flex items-center justify-center max-w-screen-xl mx-auto">
        <button
          onClick={onScrollLeftClick}
          className="flex item-center justify-center p-2"
        >
          <AiFillCaretLeft fontSize="1.5em" className="text-slate-500" />
        </button>
        <div
          ref={ref}
          className="flex flex-row w-fit overflow-x-hidden scroll-smooth gap-4 p-1"
        >
          {items}
        </div>
        <button
          onClick={onScrollRightClick}
          className="flex item-center justify-center p-2"
        >
          <AiFillCaretRight fontSize="1.5em" className="text-slate-500" />
        </button>
      </div>
    </div>
  );
}

export default CategoryCarousel;
