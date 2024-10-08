"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductColors from "./productColors";
import ProductImages from "./productImages";
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductBrandCatMnf from "./productBrandCatMnf";
import ProductAbout from "./productAbout";
import Quantity from "./quantity";

const Product = ({ params }: { params: { productId: any } }) => {
  const [product, setProduct]: any = useState([]);
  const [selectedColorId, setSelectedColorId]: any = useState(null);
  const [productQuantity, setProductQuantity]: any = useState(1);

  const productIdDecoded = useMemo(
    () =>
      Buffer.from(decodeURIComponent(params.productId), "base64").toString(
        "utf-8"
      ),
    [params]
  );
  const fetchProduct = useCallback(async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productIdDecoded}`;
    const res = await fetch(url);
    const response = await res.json();
    if (response.flag) {
      setProduct(response.data);
    }
  }, [productIdDecoded]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row w-full p-3 md:p-6 bg-white">
          {/* Product Images Section */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 flex items-center justify-center bg-blend-soft-light">
            <ProductImages images={product.image} />
          </div>

          {/* Product Info Section */}
          <div className="w-full md:w-2/3 flex flex-col md:flex-row">
            <div className="w-full md:w-2/3">
              <ProductTitle product={product} />
              <ProductPrice price={product.price} />

              {/* Product Details */}
              <div className="w-full my-4 py-2">
                {product?.colors && (
                  <ProductColors
                    colors={product?.colors}
                    selectedColorId={selectedColorId}
                    setSelectedColorId={setSelectedColorId}
                  />
                )}
                <ProductBrandCatMnf product={product} />
                {product?.description && (
                  <ProductAbout description={product?.description} />
                )}
              </div>
            </div>

            {/* Add to Cart or Buy */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-start items-start">
              <div className="w-full md:w-[85%] h-auto p-3 border border-gray-300">
                <div className="w-full md:w-2/3 py-2 text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-medium text-gray-900">
                    <span className="text-sm">&#8377;</span>
                    {product.price}
                  </p>
                </div>
                <Quantity productQuantity={productQuantity} setProductQuantity={setProductQuantity} />
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full bg-yellow-500 px-4 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add to Cart
                </button>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
