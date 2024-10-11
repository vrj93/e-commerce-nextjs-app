import isValidPhone from "../utils/isValidPhone";
import searchPhone from "./utils/searchPhone";

const Phone = ({ setUser, userError, setUserError }: any) => {
  const handlePhone = async (e: any) => {
    const phone = e.target.value;
    
    if (isValidPhone(phone)) {
      phone && await searchPhone(phone);
      setUser((prevUser: any) => ({
        ...prevUser,
        phone,
      }));
      setUserError((prevUserError: any) => ({
        ...prevUserError,
        phoneError: false,
      }));
    } else {
      setUserError((prevUserError: any) => ({
        ...prevUserError,
        phoneError: true,
      }));
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-900"
      >
        Enter Phone <span className="text-red-500">*</span>
      </label>
      <div className="mt-2">
        <input
          id="phone"
          name="phone"
          type="text"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onBlur={handlePhone}
        />
        <label
          className={`text-sm text-red-500 ${
            !userError.phoneError && "hidden"
          }`}
        >
          Please enter valid Phone
        </label>
      </div>
    </div>
  );
};

export default Phone;
