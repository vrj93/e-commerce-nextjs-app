"use client";
import { useAppDispatch } from "@/store";
import { setAuthState } from "@/store/auth/authSlice";
import { useEffect, useState } from "react";
import Username from "@/app/signin/username";
import Password from "@/app/signin/password";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { setUserName } from "@/store/auth/userSlice";
import handleLogin from "./utils/handleLogin";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<{ phone: string; email: string }>({
    phone: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signInEnabled, setSigninEnabled] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleLogin(
      user,
      password,
      setAuthState,
      setUserName,
      dispatch,
      router
    );
  };

  useEffect(() => {
    if (
      (user.phone !== "" || user.email !== "") &&
      !usernameError &&
      !passwordError
    ) {
      setSigninEnabled(true);
    } else {
      setSigninEnabled(false);
    }
  }, [user, password, usernameError, passwordError]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
        <Image
          src="/amzlogo2.svg"
          className="mx-auto h-16 w-auto sm:h-20"
          alt="AMZ Logo"
          width={0}
          height={0}
        />
        <h2 className="mt-6 text-center text-xl font-bold leading-7 sm:text-2xl sm:leading-9 text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <Username
            setUser={setUser}
            usernameError={usernameError}
            setUsernameError={setUsernameError}
          />
          <Password
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
          />
          <button
            type="submit"
            className={`flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ${
              !signInEnabled && "opacity-50"
            }`}
            disabled={!signInEnabled}
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href='signup'
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Start here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
