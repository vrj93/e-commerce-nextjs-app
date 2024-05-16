'use client';

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

const ByCategory = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);

    const handleProductByCategory = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/product-by-category`;
        const res = await fetch(url);
        const response = await res.json();

        if (response.flag) {
            setProducts(response.data);
        }
    }
    console.log(products);
    useEffect(() => {
        handleProductByCategory();
    }, []);

    return (
        <div className="bg-gray-300 m-8">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="mb-6 font-bold text-2xl">Popular Products by Category</h2>

                <div
                    className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
                    {products.map((product: any) => (
                        <a key={product.product_id} href='#'
                           onClick={() => router.push(`/product/${product.product_id}`)} className="group">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                {
                                    product.image &&
                                    <Image
                                        src={product.image[0]}
                                        alt=''
                                        className="p-2 h-full w-full object-cover object-center group-hover:opacity-75"
                                        width={0}
                                        height={0}
                                        layout='responsive'
                                    />
                                }
                            </div>
                            <h3 className="mt-4 font-bold text-sm text-gray-700">{product.category_name}</h3>
                            <h3 className="text-sm text-gray-700">{product.product_name}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900"><span className='text-sm'>&#8377;</span>{product.price}</p>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ByCategory;
