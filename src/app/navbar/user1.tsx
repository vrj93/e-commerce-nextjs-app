import Link from "next/link";

const User1 = ({ authState, userNameState }: any) => {
  return (
    <Link
      href="#"
      className="flex justify-center items-center menu-hover text-base font-medium text-white"
    >
      <div className="flex flex-col">
        <span className="flex">
          <span className="text-xs hidden md:block lg:block text-stone-200">Hello,</span>
          <span className="text-md font-semibold md:font-normal lg:font-normal md:text-xs lg:text-xs md:ml-1 lg:ml-1 text-stone-200">
            {authState ? userNameState : "Sign in"}
          </span>
        </span>
        <span className="text-stone-200 hidden md:block lg:block">Account</span>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 3"
        strokeWidth="1.5"
        stroke="white"
        className="h-4 w-4 text-stone-200 hidden md:block lg:block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 5l-5 5-5-5"
        />
      </svg>
    </Link>
  );
};

export default User1;
