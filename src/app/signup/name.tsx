const Name = ({ setUser, userError, setUserError }: any) => {
  const handleName = (e: any) => {
    const eventId = e.target.id;
    const eventValue = e.target.value;

    if (eventValue !== "") {
      setUser((prevUser: any) => ({
        ...prevUser,
        [eventId]: eventValue,
      }));
      setUserError((prevUserError: any) => ({
        ...prevUserError,
        [eventId == 'firstName' ? 'firstNameError' : 'lastNameError']: false,
      }));
    } else {
      setUserError((prevUserError: any) => ({
        ...prevUserError,
        [eventId == 'firstName' ? 'firstNameError' : 'lastNameError']: true,
      }));
    }
  };

  return (
    <>
      <div className="mb-2">
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-900"
        >
          Enter First name <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onBlur={handleName}
          />
          <label
            className={`text-sm text-red-500 ${
              !userError.firstNameError && "hidden"
            }`}
          >
            Please enter First name
          </label>
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900"
        >
          Enter Last name <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="block w-full rounded-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onBlur={handleName}
          />
          <label
            className={`text-sm text-red-500 ${
              !userError.lastNameError && "hidden"
            }`}
          >
            Please enter Last name
          </label>
        </div>
      </div>
    </>
  );
};

export default Name;
