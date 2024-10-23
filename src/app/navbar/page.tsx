"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "./logo";
import Location from "./location";
import Category from "./category";
import SearchBar from "./searchBar";
import SearchButton from "./searchButton";
import User from "./user";
import Order from "./order";
import Cart from "./cart";
import fetchLocation from "./utils/fetchLocation";
import fetchCategories from "./utils/fetchCategories";
import { NavbarContext, NavbarContextProvider } from "./context/navbarContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const {
    isMobile,
    selectedCategory,
    searchText,
    reduxAuthState,
    reduxUserNameState,
    setLocation,
    setCategories,
    setNormalAuthState,
    setNormalUserNameState,
  } = useContext(NavbarContext);

  const handleSearch = () => {
    if (!isMobile && selectedCategory.slug === null) {
      toast.error("Please select Category.");
      return;
    }
    const searchStr = `${
      !isMobile ? "categories=" + selectedCategory.slug : ""
    }&search=${searchText}`;
    router.push(`/product?${searchStr}`);
  };

  useEffect(() => {
    fetchLocation().then((data) => setLocation(data));
    fetchCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    setNormalAuthState(reduxAuthState);
    setNormalUserNameState(reduxUserNameState);
  }, [reduxAuthState, reduxUserNameState]);

  return (
    <nav className="w-full flex flex-wrap pt-1 md:p-2 lg:p-2 bg-gray-900 justify-between md:justify-center lg:justify-center items-center md:space-x-10 lg:space-x-10 space-y-2 md:space-y-0 lg:space-y-0">
      <Logo />
      <Location />
      <div className="w-full md:w-[40%] lg:w-[40%] h-10 flex px-2 justify-center items-center order-4 md:order-3 lg:order-3">
        <Category />
        <SearchBar />
        <SearchButton handleSearch={handleSearch} />
      </div>
      <div className="flex order-2 md:order-last lg:order-last space-x-4 mr-2 md:mr-0 lg:mr-0 items-center">
        <User />
        <Order />
        <Cart />
      </div>
    </nav>
  );
};

const Page = () => {
  return (
    <NavbarContextProvider>
      <Navbar />
    </NavbarContextProvider>
  );
};

export default Page;
