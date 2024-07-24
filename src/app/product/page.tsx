"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const Product = ({ productStr }: any) => {
  const product = productStr && JSON.parse(productStr);
  // console.log(product);
  return (
    <a
      key={product.id}
      href="#"
      // onClick={() => handleProductPage(product.product_id)}
      className="min-w-[18%] group"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-800 xl:aspect-h-8 xl:aspect-w-6">
        {product.image && (
          <Image
            src={product.image[0]}
            alt=""
            className="p-1 h-full w-full object-cover object-center group-hover:opacity-75"
            width={0}
            height={0}
            layout="responsive"
          />
        )}
      </div>
      <h3 className="mt-1 text-md text-gray-700">{product.name}</h3>
      <p className="text-md font-medium text-gray-900">
        <span className="text-sm">&#8377;</span>
        {product.price}
      </p>
    </a>
  );
};

const ProductList = () => {
  const searchParams = useSearchParams();
  const searchEncoded: any = searchParams.get("search");
  const searchObj = useMemo(() => {
    return JSON.parse(Buffer.from(searchEncoded, "base64").toString("utf-8"));
  }, [searchEncoded]);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
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
      body: JSON.stringify(searchObj),
    });
    const response = await res.json();
    setProducts(response.data);
  }, [searchObj]);

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

  useEffect(() => {
    handleSearch();
    getColors();
    getCategory();
    getBrand();
  }, [handleSearch, getColors, getCategory, getBrand]);
console.log(products);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex p-8 bg-white rounded-lg">
        <aside className="w-1/4 pr-4">
          <h2 className="text-lg font-medium mb-2">Color</h2>
          <ul>
            {colors &&
              colors.slice(0, visibleColors).map((color, index) => (
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
              categories.slice(0, visibleCategories).map((category, index) => (
                <li key={index}>
                  <label>
                    <input type="checkbox" className="mr-2" />
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
              brands.slice(0, visibleBrands).map((brand, index) => (
                <li key={index}>
                  <label>
                    <input type="checkbox" className="mr-2" />
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
