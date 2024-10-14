"use client";
import Image from "next/image";
import Password from "./password";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Phone from "./phone";
import Email from "./email";
import Name from "./name";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
  }>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const [userError, setUserError] = useState<{
    firstNameError: boolean;
    lastNameError: boolean;
    phoneError: boolean;
    emailError: boolean;
    passwordError: boolean;
  }>({
    firstNameError: false,
    lastNameError: false,
    phoneError: false,
    emailError: false,
    passwordError: false,
  });
  const [signUpEnabled, setSignUpEnabled] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (
      user.firstName !== "" &&
      user.lastName !== "" &&
      user.phone !== "" &&
      user.password !== "" &&
      !userError.firstNameError &&
      !userError.lastNameError &&
      !userError.phoneError &&
      !userError.emailError &&
      !userError.passwordError
    ) {
      setSignUpEnabled(true);
    } else {
      setSignUpEnabled(false);
    }
  }, [user, userError]);

  return (
    <div className="flex w-2/3 flex-1 ml-52 mr-auto px-4 py-4 sm:px-6 lg:px-8 justify-center items-center">
      <div className="flex flex-col w-full h-auto mx-auto mt-40 max-w-xs sm:max-w-sm lg:max-w-md justify-center self-start">
        <Image
          src="/amzlogo2.svg"
          className="h-15 w-auto md:h-24 sm:h-16"
          alt="AMZ Logo"
          width={0}
          height={0}
        />
        <h2 className="mt-4 text-xl text-center font-bold md:text-3xl sm:text-2xl sm:leading-9 text-gray-900">
          Create Account
        </h2>
      </div>
      <div className="w-full mx-auto mt-6 max-w-xs sm:max-w-sm lg:max-w-md justify-center">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <Name
            setUser={setUser}
            userError={userError}
            setUserError={setUserError}
          />
          <Phone
            setUser={setUser}
            userError={userError}
            setUserError={setUserError}
          />
          <Email
            setUser={setUser}
            userError={userError}
            setUserError={setUserError}
          />
          <Password
            setUser={setUser}
            userError={userError}
            setUserError={setUserError}
          />
          <div className="flex w-full justify-between items-center">
            <button
              type="submit"
              className={`flex w-1/2 justify-center rounded-full bg-yellow-500 px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ${
                !signUpEnabled && "opacity-50"
              }`}
              disabled={!signUpEnabled}
            >
              Create Account
            </button>
            <p className="text-sm text-gray-500">
              Already a member?{" "}
              <Link
                href="/signin"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
