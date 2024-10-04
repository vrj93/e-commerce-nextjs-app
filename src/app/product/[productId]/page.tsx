"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductColors from "./productColors";
import ProductImages from "./productImages";
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductBrandCatMnf from "./productBrandCatMnf";
import ProductAbout from "./productAbout";

const Product = ({ params }: { params: { productId: any } }) => {
  const [product, setProduct]: any = useState([]);
  const [selectedColorId, setSelectedColorId]: any = useState([]);

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
      <div className="container mx-auto">
        <div className="flex flex-wrap md:flex-nowrap mx-4 md:mx-16 p-3 md:p-6 bg-white">
          <ProductImages />
          <div className="flex w-full md:w-2/3">
            <div className="w-2/3">
              <ProductTitle product={product} />
              <ProductPrice price={product.price} />
              <div className="w-full my-4 py-2 border-b border-gray-300">
                {product?.colors && (
                  <ProductColors
                    colors={product?.colors}
                    selectedColorId={selectedColorId}
                    setSelectedColorId={setSelectedColorId}
                  />
                )}
                <ProductBrandCatMnf product={product} />
                {product?.description && <ProductAbout description={product?.description} />}
              </div>
            </div>
            <div className="w-1/3 m-2 h-7 bg-pink-300"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
