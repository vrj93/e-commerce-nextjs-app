const Password = ({ setUser, userError, setUserError }: any) => {
  const handlePassword = (e: any) => {
    const password = e.target.value;
    if (password !== "") {
      setUser((prevUser: any) => ({
        ...prevUser,
        password,
      }));
      setUserError((prevUserError: any) => ({
        ...prevUserError,
        passwordError: false,
      }));
    } else {
      setUserError((prevUserError: any) => ({
        ...prevUserError,
        passwordError: true,
      }));
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-900"
      >
        Enter Password <span className="text-red-500">*</span>
      </label>
      <div className="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onBlur={handlePassword}
        />
        <label
          className={`text-sm text-red-500 ${!userError.passwordError && "hidden"}`}
        >
          Please enter valid Password
        </label>
      </div>
    </div>
  );
};

export default Password;
