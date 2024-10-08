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

const Navbar = () => {
  const router = useRouter();

  //Redux state -> Normal State (State mismatch on Client/Server).
  const [authState, setNormalAuthState] = useState(false);
  const [userNameState, setNormalUserNameState] = useState("");

  const reduxAuthState = useAppSelector((state) => state.auth.authState);
  const reduxUserNameState = useAppSelector(
    (state) => state.userName.userNameState
  );

  const [location, setLocation] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({
    slug: "",
    name: "",
  });
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (selectedCategory.slug === null) {
      alert("Please select Category!");
      return;
    }
    const searchStr = `categories=${selectedCategory.slug}&search=${searchText}`;
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
    <nav className="bg-gray-900 flex w-full items-center justify-center space-x-10 py-2">
      <Logo />
      <Location location={location} />
      <div className="flex p-0 items-center">
        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <SearchBar setSearchText={setSearchText} />
        <SearchButton handleSearch={handleSearch} />
      </div>
      <User
        authState={authState}
        userNameState={userNameState}
        setAuthState={setAuthState}
      />
      <Order />
      <Cart />
    </nav>
  );
};

export default Navbar;
