"use client";
import Image from "next/image";
import Password from "./password";
import { useEffect, useState } from "react";
import Phone from "./phone";
import Email from "./email";
import Name from "./name";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { handleSignup } from "./utils/handleSignup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SignupData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [user, setUser] = useState<{
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    email: string | null;
    password: string | null;
  }>({
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    password: null,
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
    if (user.firstName && user.lastName && user.phone && user.password) {
      const validUser: SignupData = {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        password: user.password,
      };
      const response = await handleSignup(validUser);

      if (response.flag) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        toast.success(response.flag);
        router.push('account/verify/phone');
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  useEffect(() => {
    if (
      user.firstName &&
      user.lastName &&
      user.phone &&
      user.password &&
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
    <div className="w-3/4 flex flex-col md:flex-row lg:flex-row mx-auto mt-4 space-y-4 justify-center items-center">
      <div className="w-full md:w-1/2 lg:w-1/2 md:h-1/2 lg:h-1/2 flex flex-col mt-4 md:mt-40 lg:mt-40 self-start items-center">
        <Image
          src="/amzlogo2.svg"
          className="object-cover object-center"
          alt="AMZ Logo"
          width={isMobile ? 50 : 100}
          height={isMobile ? 50 : 100}
          priority={true}
        />
        <h2 className="text-xl md:text-3xl lg:text-3xl font-bold text-gray-900">Create Account</h2>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 md:pr-8 lg:pr-32">
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
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`justify-center rounded-full bg-yellow-500 px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 ${
                !signUpEnabled && "opacity-50"
              }`}
              disabled={!signUpEnabled}
            >
              Create Account
            </button>
            <p className="text-sm text-gray-500 max-w-40 md:max-w-full lg:max-w-full">
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
