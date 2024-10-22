"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Products from "./products";
import productFilter from "./utils/productFilter";
import productCategories from "./utils/productCategories";
import productBrands from "./utils/productBrands";
import productColors from "./utils/productColors";
import { FilterContext, FilterContextProvider } from "./context/filterContext";
import Filters from "./filters/filters";

const ProductList = () => {
  const {
    selectedColors,
    selectedCategories,
    selectedBrands,
    searchText,
    setProducts,
    setColors,
    setCategories,
    setBrands,
  } = useContext(FilterContext);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getColors = useCallback(async () => {
    setColors(await productColors());
  }, []);

  const getCategory = useCallback(async () => {
    setCategories(await productCategories());
  }, []);

  const getBrand = useCallback(async () => {
    setBrands(await productBrands());
  }, []);

  const handleSearch = useCallback(async () => {
    const data = await productFilter(
      selectedCategories,
      selectedBrands,
      selectedColors,
      searchText
    );
    setProducts(data);
  }, [selectedCategories, selectedBrands, selectedColors, searchText]);

  useEffect(() => {
    getColors();
    getCategory();
    getBrand();
    handleSearch();
  }, [getColors, getCategory, getBrand, handleSearch]);

  return (
    <div className="flex flex-col md:flex-row lg:flex-row p-2 m-2 bg-white rounded-lg">
      <div className="flex px-2 py-3 md:hidden lg:hidden justify-end">
        <button
          type="submit"
          className="px-4 py-1 mr-1 border border-gray-500 rounded-md"
          onClick={() => setIsFilterOpen(true)}
        >
          Filter
        </button>
      </div>
      <aside className="md:w-[20%] lg:w-[20%] p-2 space-y-4 hidden md:block lg:block">
        <Filters />
      </aside>
      <Products />
      <div
        className={`fixed inset-x-0 bottom-0 max-h-[75%] overflow-scroll bg-white px-4 py-8 space-y-4 rounded-t-lg shadow-lg md:hidden z-50 duration-200 ${
          isFilterOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Filter</h2>
          <button
            onClick={() => setIsFilterOpen(false)}
            className="text-red-500 border border-red-500 px-4 py-1 rounded-md"
          >
            Close
          </button>
        </div>
        <Filters />
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <FilterContextProvider>
      <ProductList />
    </FilterContextProvider>
  );
};

export default Page;
