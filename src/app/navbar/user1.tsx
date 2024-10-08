const User1 = ({ authState, userNameState }: any) => {
  return (
    <div className="flex items-center justify-between space-x-5">
      <a className="menu-hover text-base font-medium text-white lg:mx-4">
        <div className="flex flex-col">
          <span className="text-xs text-stone-200">
            Hello, {authState ? userNameState : "Sign in"}
          </span>
          <span className="text-stone-200">Account</span>
        </div>
      </a>
      <div className="" style={{ marginLeft: "0px" }}>
        <span className="text-stone-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 3"
            strokeWidth="1.5"
            stroke="white"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 5l-5 5-5-5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default User1;
