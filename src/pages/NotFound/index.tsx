import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col gap-3 items-center justify-center">
        <span className="text-8xl"> 🙈 </span>
        <h1 className="font-bold text-3xl">
          Looks like this page does not exist
        </h1>
        <button className="flex border text-white bg-orange-500 hover:bg-orange-400 transition items-center justify-center rounded-full w-32 h-8">
          <Link to={"/"}> Home </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
