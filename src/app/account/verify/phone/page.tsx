"use client";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { processPhoneVerification } from "../utils/verifyOtp";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface User {
  id: number;
  firstName: string;
  phone: string;
}

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    id: 0,
    firstName: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handlePhoneVerification = async (e: any) => {
    e.preventDefault();
    const response = await processPhoneVerification(user.id, Number(otp));
    if (response.flag) {
      toast.success(response.msg);
      router.push("/signin");
    } else {
      toast.error("Invalid OTP, please try again.");
    }
  };

  useEffect(() => {
    otp.length == 6 ? setIsButtonEnabled(true) : setIsButtonEnabled(false);
  }, [otp]);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const storedUser: string = sessionStorage.getItem("user") ?? "";
      setUser(JSON.parse(storedUser));
      sessionStorage.removeItem("user");
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[80%] md:w-[25%] lg:w-[25%] flex flex-col mt-[12%]">
        <div className="w-full flex flex-col my-4">
          <h3 className="text-lg font-semibold">Hi, {user?.firstName}</h3>
          <h2 className="text-md font-normal">
            Verify your phone{" "}
            <span className="font-semibold">{user?.phone}</span> for account
            registration.
          </h2>
        </div>
        <form
          className="space-y-6 w-full max-w-max"
          action="#"
          method="POST"
          onSubmit={handlePhoneVerification}
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
            onPaste={(e) => setOtp(e.clipboardData.getData("Text"))}
            numInputs={6}
            inputType="tel"
            renderSeparator={<span style={{ width: "8px" }}></span>}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus={true}
            inputStyle={{
              border: "1px solid transparent",
              borderRadius: "8px",
              width: "54px",
              height: "54px",
              fontSize: "20px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
            }}
          />
          <button
            type="submit"
            className={`justify-center rounded-full bg-yellow-500 px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-yellow-600 ${
              !isButtonEnabled && "opacity-50"
            }`}
            disabled={!isButtonEnabled}
          >
            Verify Phone
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
