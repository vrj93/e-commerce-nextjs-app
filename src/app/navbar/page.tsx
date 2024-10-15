"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store";
import { setAuthState } from "@/store/auth/authSlice";
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
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  //Redux state -> Normal State (State mismatch on Client/Server).
  const [authState, setNormalAuthState] = useState(false);
  const [userNameState, setNormalUserNameState] = useState("");
  const reduxAuthState = useAppSelector((state) => state.auth.authState);
  const reduxUserNameState = useAppSelector(
    (state) => state.userName.userNameState
  );
  const [location, setLocation] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<{ slug: null | string, name: null | string }>({
    slug: null,
    name: null,
  });
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (!isMobile && selectedCategory.slug === null) {
      alert("Please select Category!");
      return;
    }
    const searchStr = `${!isMobile ? 'categories=' + selectedCategory.slug : ''}&search=${searchText}`;
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
      <Location location={location} />
      <div className="w-full md:w-[40%] lg:w-[40%] h-10 flex px-2 justify-center items-center order-4 md:order-3 lg:order-3">
        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <SearchBar setSearchText={setSearchText} />
        <SearchButton handleSearch={handleSearch} />
      </div>
      <div className="flex order-2 md:order-last lg:order-last space-x-4 mr-2 md:mr-0 lg:mr-0 items-center">
        <User
          authState={authState}
          userNameState={userNameState}
          setAuthState={setAuthState}
        />
        <Order />
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
