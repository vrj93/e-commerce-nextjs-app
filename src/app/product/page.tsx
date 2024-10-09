"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Color from "./filters/color";
import Category from "./filters/category";
import Brand from "./filters/brand";
import Products from "./products";
import productFilter from "./utils/productFilter";
import productCategories from "./utils/productCategories";
import productBrands from "./utils/productBrands";
import productColors from "./utils/productColors";
import handleToggleCategory from "./utils/handleToggleCategory";
import handleToggleBrand from "./utils/handleToggleBrand";
import handleToggleColor from "./utils/handleToggleColor";

const ProductList = () => {
  const router = useRouter();
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
  const searchText = useMemo(() => {
    return searchParams.get("search") ?? "";
  }, [searchParams]);

  const [products, setProducts] = useState([]);
  const [colors, setColors]: any = useState([]);
  const [categories, setCategories]: any = useState([]);
  const [brands, setBrands]: any = useState([]);
  const [visibleColors, setVisibleColors] = useState(5);
  const [visibleCategories, setVisibleCategories] = useState(5);
  const [visibleBrands, setVisibleBrands] = useState(5);

  const handleSearch = useCallback(async () => {
    const data = await productFilter(
      selectedCategories,
      selectedBrands,
      selectedColors,
      searchText
    );
    setProducts(data);
  }, [selectedCategories, selectedBrands, selectedColors, searchText]);

  const getColors = useCallback(async () => {
    setColors(await productColors());
  }, []);

  const getCategory = useCallback(async () => {
    setCategories(await productCategories());
  }, []);

  const getBrand = useCallback(async () => {
    setBrands(await productBrands());
  }, []);

  const toggleColor = async (e: any, color: string) => {
    handleToggleColor(
      e.target.checked,
      color,
      selectedColors,
      selectedCategories,
      selectedBrands,
      searchText,
      router
    );
  };

  const toggleCategory = async (e: any, category: string) => {
    handleToggleCategory(
      e.target.checked,
      category,
      selectedCategories,
      selectedBrands,
      selectedColors,
      searchText,
      router
    );
  };

  const toggleBrand = async (e: any, brand: string) => {
    handleToggleBrand(
      e.target.checked,
      brand,
      selectedBrands,
      selectedCategories,
      selectedColors,
      searchText,
      router
    );
  };

  useEffect(() => {
    handleSearch();
    getColors();
    getCategory();
    getBrand();
  }, [handleSearch, getColors, getCategory, getBrand]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row p-4 lg:p-8 bg-white rounded-lg">
        <aside className="w-full lg:w-1/4 mb-4 lg:mb-0 lg:pr-4">
          <Color
            colors={colors}
            visibleColors={visibleColors}
            selectedColors={selectedColors}
            toggleColor={toggleColor}
            showMoreColors={() => setVisibleColors(colors.length)}
          />
          <Category
            categories={categories}
            visibleCategories={visibleCategories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            showMoreCategories={() => setVisibleCategories(categories.length)}
          />
          <Brand
            brands={brands}
            visibleBrands={visibleBrands}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            showMoreBrands={() => setVisibleBrands(brands.length)}
          />
        </aside>
        <div className="w-full lg:w-3/4">
          <Products products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
