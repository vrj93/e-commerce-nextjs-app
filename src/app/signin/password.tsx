const Password = ({ setPassword, passwordError, setPasswordError }: any) => {
  const handlePassword = (e: any) => {
    if (e.target.value != "") {
      setPassword(e.target.value);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Enter Password
        </label>
        <div className="text-sm">
          <a href="#" className="font-semibold text-black hover:text-black">
            Forgot password?
          </a>
        </div>
      </div>
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
        <label className={`text-sm text-red-500 ${!passwordError && "hidden"}`}>
          Please enter valid Password
        </label>
      </div>
    </div>
  );
};

export default Password;
