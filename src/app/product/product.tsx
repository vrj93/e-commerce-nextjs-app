"use client";

import Image from "next/image";
import Link from "next/link";

const Product = ({ productStr }: any) => {
  const product = productStr && JSON.parse(productStr);
  const productDecode = Buffer.from(product.id.toString()).toString("base64"); 
  return (
    <Link
      key={product.id}
      href={`product/${productDecode}`}
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-[18%] group hover:shadow-lg hover:shadow-gray-400 rounded-md"
    >
      <div className="aspect-w-3 aspect-h-4 w-full overflow-hidden rounded-md">
        <Image
          src={product.image ? product.image[0] : "/no-image-found.webp"}
          alt=""
          className="h-full w-full object-cover object-center group-hover:opacity-90"
          fill
        />
      </div>
      <div className="px-2 py-1">
        <h3 className="mt-1 text-md text-gray-700">{product.name}</h3>
        <p className="text-md font-medium text-gray-900">
          <span className="text-sm">&#8377;</span>
          {product.price}
        </p>
      </div>
    </Link>
  );
};

export default Product;
