const SearchBar = ({ setSearchText }: any) => {
  return (
    <div className="items-center">
      <input
        type="text"
        name="search"
        className="h-10 pl-2 w-96 text-sm"
        placeholder="Search Products"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
