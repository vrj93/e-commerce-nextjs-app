"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Product = ({ productStr }: any) => {
  const router = useRouter();
  const product = productStr && JSON.parse(productStr);
  console.log(product);

  const handleProductPage = (productId: any) => {
    const encodedId = Buffer.from(productId.toString()).toString("base64");
    router.push(`/product/${encodedId}`);
  };

  return (
    <a
      key={product.id}
      href="#"
      onClick={() => handleProductPage(product.id)}
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

export default Product;
