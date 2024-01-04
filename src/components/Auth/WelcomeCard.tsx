const WelcomeCard = ({ signUpMode, setSignUpMode }) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center bg-slate-800 p-4 rounded-lg text-white w-full">
      <h3 className="text-3xl font-medium mb-4 text-center">
        Welcome to Hot Dealz
      </h3>
      <p className="text-sm text-gray-500">
        {signUpMode ? "Already registered? " : "Not registered? "}
        <a
          onClick={() => setSignUpMode(!signUpMode)}
          className="text-orange-700 hover:underline"
        >
          {signUpMode ? "Sign in" : "Sign up"}
        </a>
      </p>
    </div>
  );
};

export default WelcomeCard;
