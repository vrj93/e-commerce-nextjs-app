'use client';

import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Image from "next/image";

const ByBrand = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    const handleProductByBrand = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/product-by-brand`;
        const res = await fetch(url);
        const response = await res.json();

        if (response.flag) {
            setProducts(response.data);
        }
    }

    useEffect(() => {
        handleProductByBrand();
    }, []);

    return (
        <div className="bg-white m-12 rounded-2xl">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="mb-6 font-bold text-2xl">Popular Products by Brand</h2>

                <div className="w-full">
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="flex space-x-8">
                            {products.map((product: any) => (
                                <a
                                    key={product.product_id}
                                    href="#"
                                    onClick={() => router.push(`/product/${product.product_id}`)}
                                    className="min-w-[18%] group"
                                >
                                    <div
                                        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-800 xl:aspect-h-8 xl:aspect-w-7">
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
                                    <h3 className="mt-4 font-bold text-sm text-gray-700">{product.brand}</h3>
                                    <h3 className="text-sm text-gray-700">{product.product_name}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">
                                        <span className="text-sm">&#8377;</span>{product.price}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ByBrand;