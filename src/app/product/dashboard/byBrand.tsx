"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import handleProductByBrand from "../utils/handleProductByBrand";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/swiper-design.css";
import { useMediaQuery } from "react-responsive";

const ByBrand = () => {
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(true);
  const isMobileQuery = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    handleProductByBrand().then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const identifyMobile = () => {
      setIsMobile(isMobileQuery);
    };
    identifyMobile();
  }, [isMobileQuery]);

  return (
    <div className="bg-white p-2 md:p-4 lg:p-4 m-3 md:m-5 lg:m-5 rounded-xl">
      <h2 className="px-2 md:px-14 lg:px-14 mb-2 md:mb-4 lg:mb-4 font-bold text-xl">
        Popular Products by Brand
      </h2>
      <div className="flex w-full items-center space-x-1">
        <button className="by-brand-swiper-prev arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
            <path d="M13.293 7.293 8.586 12l4.707 4.707 1.414-1.414L11.414 12l3.293-3.293-1.414-1.414z" />
          </svg>
        </button>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={25}
          slidesPerView={isMobile ? 2 : 5}
          slidesPerGroup={isMobile ? 1 : 5}
          autoHeight={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: ".by-brand-swiper-next",
            prevEl: ".by-brand-swiper-prev",
          }}
        >
          {products.map((product: any, index: number) => (
            <SwiperSlide key={index} className="p-1 rounded-lg bg-purple-200">
              <Link
                key={product.product_id}
                href={`/product/${Buffer.from(
                  product.product_id.toString()
                ).toString("base64")}`}
                className="min-w-[18%] group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg">
                  {product.image && (
                    <Image
                      src={product.image[0]}
                      alt=""
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                      width={0}
                      height={0}
                      layout="responsive"
                    />
                  )}
                </div>
                <div className="px-2">
                  <h3 className="mt-4 font-bold text-sm text-gray-700">
                    {product.brand}
                  </h3>
                  <h3 className="text-sm text-gray-700">
                    {product.product_name}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    <span className="text-sm">&#8377;</span>
                    {product.price}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="by-brand-swiper-next arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="52"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
            <path d="M9.293 8.707 12.586 12l-3.293 3.293 1.414 1.414L15.414 12l-4.707-4.707-1.414 1.414z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ByBrand;
