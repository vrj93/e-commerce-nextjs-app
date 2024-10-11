"use client";
import Image from "next/image";
import Password from "./password";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Phone from "./phone";
import Email from "./email";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<{
    phone: string;
    email: string;
    password: string;
  }>({
    phone: "",
    email: "",
    password: "",
  });
  const [userError, setUserError] = useState<{
    phoneError: boolean;
    emailError: boolean;
    passwordError: boolean;
  }>({
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
      user.phone !== "" &&
      user.password !== "" &&
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
          Create AMZ account
        </h2>
      </div>
      <div className="mt-8 mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
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
          <button
            type="submit"
            className={`flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 ${
              !signUpEnabled && "opacity-50"
            }`}
            disabled={!signUpEnabled}
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            onClick={() => router.push("/signin")}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Page;
