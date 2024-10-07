"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Color from "./filters/color";
import Category from "./filters/category";
import Brand from "./filters/brand";
import Products from "./products";

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
    return searchParams.get("search");
  }, [searchParams]);

  const [products, setProducts] = useState([]);
  const [colors, setColors]: any = useState([]);
  const [categories, setCategories]: any = useState([]);
  const [brands, setBrands]: any = useState([]);
  const [visibleColors, setVisibleColors] = useState(5);
  const [visibleCategories, setVisibleCategories] = useState(5);
  const [visibleBrands, setVisibleBrands] = useState(5);

  const showMoreColors = () => setVisibleColors(colors.length);
  const showMoreCategories = () => setVisibleCategories(categories.length);
  const showMoreBrands = () => setVisibleBrands(brands.length);

  const handleSearch = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/filter`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories: selectedCategories,
        brands: selectedBrands,
        colors: selectedColors,
        search: searchText,
      }),
    });
    const response = await res.json();
    setProducts(response.data);
  }, [selectedCategories, selectedBrands, selectedColors, searchText]);

  const getColors = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/color`;
    const res = await fetch(url);
    const response = await res.json();
    setColors(response.data);
  }, []);

  const getCategory = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/category`;
    const res = await fetch(url);
    const response = await res.json();
    setCategories(response.data);
  }, []);

  const getBrand = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/brand`;
    const res = await fetch(url);
    const response = await res.json();
    setBrands(response.data);
  }, []);

  const toggleCategory = async (e: any, category: string) => {
    let categories = [...selectedCategories];
    if (e.target.checked) {
      categories?.push(category);
    } else {
      categories?.splice(categories.indexOf(category), 1);
    }
    const searchStr = `${
      categories && categories.length
        ? "categories=" + categories?.join("_")
        : ""
    }${
      selectedBrands && selectedBrands.length
        ? "&brands=" + selectedBrands?.join("_")
        : ""
    }${
      selectedColors && selectedColors.length
        ? "&colors=" + selectedColors?.join("_")
        : ""
    }&search=${searchText}`;
    router.push(`/product?${searchStr}`);
  };

  const toggleBrand = async (e: any, brand: string) => {
    let brands = [...selectedBrands];
    if (e.target.checked) {
      brands?.push(brand);
    } else {
      brands?.splice(brands.indexOf(brand), 1);
    }
    const searchStr = `${
      selectedCategories && selectedCategories.length
        ? "categories=" + selectedCategories?.join("_")
        : ""
    }${brands && brands.length ? "&brands=" + brands?.join("_") : ""}${
      selectedColors && selectedColors.length
        ? "&colors=" + selectedColors?.join("_")
        : ""
    }&search=${searchText}`;
    router.push(`/product?${searchStr}`);
  };

  const toggleColor = async (e: any, color: string) => {
    let colors = [...selectedColors];
    if (e.target.checked) {
      colors?.push(color);
    } else {
      colors?.splice(colors.indexOf(color), 1);
    }
    const searchStr = `${
      selectedCategories && selectedCategories.length
        ? "categories=" + selectedCategories?.join("_")
        : ""
    }${
      selectedBrands && selectedBrands.length
        ? "&brands=" + selectedBrands?.join("_")
        : ""
    }${
      colors && colors.length ? "&colors=" + colors?.join("_") : ""
    }&search=${searchText}`;
    router.push(`/product?${searchStr}`);
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
            showMoreColors={showMoreColors}
          />
          <Category
            categories={categories}
            visibleCategories={visibleCategories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            showMoreCategories={showMoreCategories}
          />
          <Brand
            brands={brands}
            visibleBrands={visibleBrands}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            showMoreBrands={showMoreBrands}
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
