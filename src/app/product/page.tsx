"use client";

import { useCallback, useContext, useEffect } from "react";
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
      <Filters />
      <Products />
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
