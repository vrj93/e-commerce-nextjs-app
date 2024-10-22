import { useContext } from "react";
import { NavbarContext } from "./context/navbarContext";

const Location = () => {
  const {location } = useContext(NavbarContext);
  return (
    <div className="flex md:flex-col lg:flex-col w-full md:w-auto lg:w-auto p-3 md:p-1 lg:p-1 bg-gray-700 md:bg-transparent lg:bg-transparent justify-start md:justify-end lg:justify-end order-last md:order-2 lg:order-2">
      <span className="text-xs text-stone-200 font-semibold mr-2 md:mr-0 lg:mr-0">
        Deliver to
      </span>
      <span className="text-xs md:text-sm lg:text-sm text-stone-200 font-bold">
        {location.city}, {location.country}
      </span>
    </div>
  );
};

export default Location;
