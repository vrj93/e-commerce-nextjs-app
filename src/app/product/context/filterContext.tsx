import { useSearchParams } from "next/navigation";
import { createContext, FC, useMemo, useState } from "react";

interface FilterContextType {
  products: any[];
  colors: any[];
  categories: any[];
  brands: any[];
  visibleColors: number;
  visibleCategories: number;
  visibleBrands: number;
  selectedColors: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  setProducts: (value: any[]) => void;
  setColors: (value: any[]) => void;
  setCategories: (value: any[]) => void;
  setBrands: (value: any[]) => void;
  setVisibleColors: (value: number) => void;
  setVisibleCategories: (value: number) => void;
  setVisibleBrands: (value: number) => void;
  searchText: string;
}

const defaultPreferences: FilterContextType = {
  products: [],
  colors: [],
  categories: [],
  brands: [],
  visibleColors: 5,
  visibleCategories: 5,
  visibleBrands: 5,
  selectedColors: [],
  selectedCategories: [],
  selectedBrands: [],
  setProducts: () => {},
  setColors: () => {},
  setCategories: () => {},
  setBrands: () => {},
  setVisibleColors: () => {},
  setVisibleCategories: () => {},
  setVisibleBrands: () => {},
  searchText: "",
};

const FilterContext = createContext<FilterContextType>(defaultPreferences);

const FilterContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  const selectedCategories = useMemo(() => {
    return searchParams.get("categories") !== null
      ? searchParams.get("categories").split("_")
      : [];
  }, [searchParams]);
  const selectedBrands = useMemo(() => {
    return searchParams.get("brands") !== null
      ? searchParams.get("brands").split("_")
      : [];
  }, [searchParams]);
  const selectedColors = useMemo(() => {
    return searchParams.get("colors") !== null
      ? searchParams.get("colors").split("_")
      : [];
  }, [searchParams]);
  const searchText: string = useMemo(() => {
    return searchParams.get("search") ?? "";
  }, [searchParams]);

  const [products, setProducts] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [visibleColors, setVisibleColors] = useState<number>(5);
  const [visibleCategories, setVisibleCategories] = useState<number>(5);
  const [visibleBrands, setVisibleBrands] = useState<number>(5);

  return (
    <FilterContext.Provider
      value={{
        products,
        colors,
        categories,
        brands,
        visibleColors,
        visibleCategories,
        visibleBrands,
        selectedColors,
        selectedCategories,
        selectedBrands,
        setProducts,
        setColors,
        setCategories,
        setBrands,
        setVisibleColors,
        setVisibleCategories,
        setVisibleBrands,
        searchText,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterContextProvider };
