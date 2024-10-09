"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProductImages from "./productImages";
import ProductInfo from "./productInfo";
import handleFetchProduct from "./utils/handleFetchProduct";

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
    setProduct(await handleFetchProduct(productIdDecoded));
  }, [productIdDecoded]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row w-full p-3 md:p-6 bg-white">
          <ProductImages images={product.image} />
          <ProductInfo
            product={product}
            selectedColorId={selectedColorId}
            setSelectedColorId={setSelectedColorId}
            productQuantity={productQuantity}
            setProductQuantity={setProductQuantity}
          />
        </div>
      </div>
    </>
  );
};

export default Product;
