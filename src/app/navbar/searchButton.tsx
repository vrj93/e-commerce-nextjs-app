const SearchButton = ({ handleSearch }: any) => {
  return (
    <div className="flex items-center">
      <button
        type="submit"
        className="absolute p-3 text-sm font-medium text-white bg-yellow-500 rounded-e-md hover:bg-yellow-700 focus:ring-2 focus:outline-none focus:ring-yellow-200 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700"
        onClick={handleSearch}
      >
        <svg
          className="w-4 h-4 text-black"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

export default SearchButton;
