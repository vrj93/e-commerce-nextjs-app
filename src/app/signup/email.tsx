import isValidEmail from "../utils/isValidEmail";
import searchEmail from "./utils/searchEmail";

const Email = ({ setUser, userError, setUserError }: any) => {
  const handleEmail = async (e: any) => {
    const email = e.target.value;

    if (isValidEmail(email, true)) {
      email && (await searchEmail(email));
      setUser((prevUser: any) => ({
        ...prevUser,
        email,
      }));
      setUserError((prevUserError: any) => ({
        ...prevUserError,
        emailError: false,
      }));
    } else {
      setUserError((prevUserError: any) => ({
        ...prevUserError,
        emailError: true,
      }));
    }
  };

  return (
    <div className="mb-2">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-900"
      >
        Enter Email
      </label>
      <div className="mt-2">
        <input
          id="email"
          name="email"
          type="text"
          required
          className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onBlur={handleEmail}
        />
        <label
          className={`text-sm text-red-500 ${
            !userError.emailError && "hidden"
          }`}
        >
          Please enter valid Email
        </label>
      </div>
    </div>
  );
};

export default Email;
