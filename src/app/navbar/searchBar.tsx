import { useContext } from "react";
import { NavbarContext } from "./context/navbarContext";

const SearchBar = () => {
  const { setSearchText } = useContext(NavbarContext);
  
  return (
    <div className="flex-grow w-auto h-full items-center">
      <input
        type="text"
        name="search"
        className="pl-2 text-sm w-full h-full rounded-l-md md:rounded-none lg:rounded-none"
        placeholder="Search Products"
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
