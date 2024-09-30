"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Product from "./product";

const ProductList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories = useMemo(() => {
    return searchParams.get('categories')?.split('_');
  }, [searchParams]);
  const selectedBrands = useMemo(() => {
    return (searchParams.get('brands') !== null) ? searchParams.get('brands').split('_') : [];
  }, [searchParams]);
  const searchText = useMemo(() => {
    return searchParams.get('search');
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
        search: searchText,
      }),
    });
    const response = await res.json();
    setProducts(response.data);
  }, [selectedCategories, selectedBrands, searchText]);

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
    let categories: any = selectedCategories;
    if (e.target.checked) {
      categories?.push(category);
    } else {
      categories?.splice(categories.indexOf(category), 1);
    }
    const searchStr = `${categories.length ? 'categories=' + categories?.join('_') : ''}&search=${searchText}`;
    router.push(`/product?${searchStr}`);
  }

  const toggleBrand = async (e: any, brand: string) => {
    let brands: any = selectedBrands;
    if (e.target.checked) {
      brands?.push(brand);
    } else {
      brands?.splice(brands.indexOf(brand), 1);
    }
    const searchStr = `categories=${selectedCategories}${brands.length ? '&brands=' + brands?.join('_') : ''}&search=${searchText}`;
    router.push(`/product?${searchStr}`);
  }

  useEffect(() => {
    handleSearch();
    getColors();
    getCategory();
    getBrand();
  }, [handleSearch, getColors, getCategory, getBrand]);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex p-8 bg-white rounded-lg">
        <aside className="w-1/4 pr-4">
          <h2 className="text-lg font-medium mb-2">Color</h2>
          <ul>
            {colors &&
              colors.slice(0, visibleColors).map((color: any, index: number) => (
                <li key={index}>
                  <label>
                    <input type="checkbox" className="mr-2" />
                    {color.name}
                  </label>
                </li>
              ))}
          </ul>
          {colors && colors.length > visibleColors && (
            <button onClick={showMoreColors} className="text-blue-500">
              See More
            </button>
          )}

          <h2 className="text-lg font-medium mt-8 mb-2">Category</h2>
          <ul>
            {categories &&
              categories.slice(0, visibleCategories).map((category: any, index: number) => (
                <li key={index}>
                  <label>
                    <input 
                      type="checkbox" 
                      className="mr-2"
                      checked={selectedCategories?.includes(category.slug) ? true : false} 
                      onChange={(e) => toggleCategory(e, category.slug)}
                    />
                    {category.name}
                  </label>
                </li>
              ))}
          </ul>
          {categories && categories.length > visibleCategories && (
            <button onClick={showMoreCategories} className="text-blue-500">
              See More
            </button>
          )}

          <h2 className="text-lg font-medium mt-8 mb-2">Brand</h2>
          <ul>
            {brands &&
              brands.slice(0, visibleBrands).map((brand: any, index: number) => (
                <li key={index}>
                  <label>
                    <input 
                      type="checkbox"
                      className="mr-2"
                      checked={selectedBrands?.includes(brand.slug) ? true : false} 
                      onChange={(e) => toggleBrand(e, brand.slug)}
                    />
                    {brand.name}
                  </label>
                </li>
              ))}
          </ul>
          {brands && brands.length > visibleBrands && (
            <button onClick={showMoreBrands} className="text-blue-500">
              See More
            </button>
          )}
        </aside>
        <div className="w-3/4">
          <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <Product key={index} productStr={JSON.stringify(product)} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
