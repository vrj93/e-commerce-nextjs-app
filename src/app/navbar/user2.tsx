import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";

const User2 = ({ authState, setAuthState }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div className="invisible absolute right-0 z-50 flex w-56 flex-col text-center bg-gray-100 py-1 pt-2 px-4 text-gray-800 shadow-xl group-hover:visible">
      {!authState && (
        <div className="mb-2 p-0">
          <a
            href="#"
            className="mt-2 block pt-1 font-semibold text-gray-500 hover:text-black md:mx-2"
          >
            <button
              type="button"
              className="py-2 px-10 bg-yellow-500 hover:bg-yellow-700 text-white text-sm rounded-xl"
              onClick={() => router.push("/signin")}
            >
              Sign in
            </button>
          </a>
          <span className="text-xs mb-2">
            New customer?
            <a
              href="#"
              className="text-blue-700"
              onClick={() => router.push("/signup")}
            >
              Start here
            </a>
          </span>
        </div>
      )}
      {authState && (
        <div>
          <a className="block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
            Account
          </a>
          <a
            className="block border-b border-gray-100 py-2 text-sm text-gray-500 hover:text-black md:mx-2"
            onClick={() => dispatch(setAuthState(false))}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default User2;
