import { useAppSelector } from "@/store";
import { createContext, FC, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface NavbarContextType {
  isMobile: boolean;
  authState: boolean;
  userNameState: string;
  reduxAuthState: boolean;
  reduxUserNameState: string;
  location: { city: string | null; country: string | null };
  selectedCategory: { slug: string | null; name: string | null };
  categories: any[];
  searchText: string;
  setNormalAuthState: (value: boolean) => void;
  setNormalUserNameState: (value: string) => void;
  setLocation: (value: { city: string | null; country: string | null }) => void;
  setSelectedCategory: (value: {
    slug: string | null;
    name: string | null;
  }) => void;
  setCategories: (value: string[]) => void;
  setSearchText: (value: string) => void;
}

const defaultPreferences: NavbarContextType = {
  isMobile: false,
  authState: false,
  userNameState: "",
  reduxAuthState: false,
  reduxUserNameState: "",
  location: { city: null, country: null },
  selectedCategory: {
    slug: null,
    name: null,
  },
  categories: [],
  searchText: "",
  setNormalAuthState: () => {},
  setNormalUserNameState: () => {},
  setLocation: () => {},
  setSelectedCategory: () => {},
  setCategories: () => {},
  setSearchText: () => {},
};

const NavbarContext = createContext<NavbarContextType>(defaultPreferences);

const NavbarContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  //Redux state -> Normal State (State mismatch on Client/Server).
  const [authState, setNormalAuthState] = useState(false);
  const [userNameState, setNormalUserNameState] = useState("");
  const reduxAuthState = useAppSelector((state) => state.auth.authState);
  const reduxUserNameState = useAppSelector(
    (state) => state.userName.userNameState
  );
  const [location, setLocation] = useState<{
    city: null | string;
    country: null | string;
  }>({
    city: null,
    country: null,
  });
  const [selectedCategory, setSelectedCategory] = useState<{
    slug: null | string;
    name: null | string;
  }>({
    slug: null,
    name: null,
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  return (
    <NavbarContext.Provider
      value={{
        isMobile,
        authState,
        userNameState,
        reduxAuthState,
        reduxUserNameState,
        location,
        selectedCategory,
        categories,
        searchText,
        setNormalAuthState,
        setNormalUserNameState,
        setLocation,
        setSelectedCategory,
        setCategories,
        setSearchText,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarContext, NavbarContextProvider };
