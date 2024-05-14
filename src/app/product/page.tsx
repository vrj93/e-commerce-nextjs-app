'use client'

import {useSearchParams} from "next/navigation";
import {useCallback, useEffect} from "react";

const Product = () => {
    const searchParams = useSearchParams();
    const searchEncoded: any = searchParams.get('search');
    const searchObj = JSON.parse(Buffer.from(searchEncoded, 'base64').toString('utf-8'));

    const handleSearch = useCallback(async () => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/filter`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchObj),
        });
        const response = await res.json();
        console.log(response)
    }, [searchObj])
    
    useEffect(() => {
        handleSearch();
    }, [handleSearch, searchObj])

    return (
        <p></p>
    );
};

export default Product;
