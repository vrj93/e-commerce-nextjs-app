import isValidEmail from "../utils/isValidEmail";
import isValidPhone from "../utils/isValidPhone";

const Username = ({ setUser, usernameError, setUsernameError }: any) => {
  const handleUsername = (e: { target: { value: string } }) => {
    const username = e.target.value;
    if (isValidPhone(username)) {
      setUser((prevUsername: any) => ({
        ...prevUsername,
        phone: username
      }));
      setUsernameError(false);
    } else if (isValidEmail(username, false)) {
      setUser((prevUsername: any) => ({
        ...prevUsername,
        email: username
      }));
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="user" className="block text-sm font-medium text-gray-900">
        Enter Phone or Email
      </label>
      <div className="mt-2">
        <input
          id="user"
          name="user"
          type="text"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onBlur={handleUsername}
        />
        <label className={`text-sm text-red-500 ${!usernameError && "hidden"}`}>
          Please enter valid Phone or Email
        </label>
      </div>
    </div>
  );
};

export default Username;
