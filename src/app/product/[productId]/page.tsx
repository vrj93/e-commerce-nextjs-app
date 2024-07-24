'use client';

import { useEffect, useState } from "react";

const Product = ({ params }: { params: { productId: any } }) => {
    const [product, setProduct]: any = useState([]);

    const productIdDecoded = Buffer.from(decodeURIComponent(params.productId), 'base64').toString('utf-8');

    const fetchProduct = async (id: any) => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`;
        const res = await fetch(url);
        const response = await res.json();
        if (response.flag) {
            console.log(response);
            setProduct(response.data);
        }
    }

    useEffect(() => {
        fetchProduct(productIdDecoded);
    }, [])

    return (
        <>
            <div><h2>{product && product.name}</h2></div>
        </>
    )
}

export default Product;