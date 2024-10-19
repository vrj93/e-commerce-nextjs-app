"use client";

import Image from "next/image";
import Link from "next/link";

const Product = ({ productStr }: any) => {
  const product = productStr && JSON.parse(productStr);

  return (
    <Link
      key={product.id}
      href={`product/${Buffer.from(product.id.toString()).toString("base64")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-[18%] group"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md xl:aspect-h-8 xl:aspect-w-6">
        <Image
          src={product.image ? product.image[0] : "/no-image-found.webp"}
          alt=""
          className="h-full w-full object-cover object-center group-hover:opacity-75"
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
