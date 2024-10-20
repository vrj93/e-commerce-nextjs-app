import Image from "next/image";
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/swiper-design.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useMediaQuery } from "react-responsive";

const ProductImages = ({ images }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const buttonSize = !isMobile && images && images.length > 1 ? "auto" : 0;
  const buttonOpacity = !isMobile && images && images.length > 1 ? 1 : 0;
  return (
    <div className="flex w-full md:w-1/3 lg:w-1/3 mb-4 md:mb-0 items-center justify-center bg-blend-soft-light">
      <button
        className="product-image-swiper-prev arrow"
        style={{
          width: `${buttonSize}`,
          height: `${buttonSize}`,
          opacity: buttonOpacity,
        }}
      >
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
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{ clickable: true }}
        className="w-2/3 h-full"
        style={{ marginLeft: "0px", marginRight: "0px" }}
        navigation={{
          nextEl: ".product-image-swiper-next",
          prevEl: ".product-image-swiper-prev",
        }}
      >
        {images ? (
          images.map((image: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="w-full h-full aspect-w-3 aspect-h-4">
                  <Image
                    src={image}
                    alt=""
                    className="object-cover object-center"
                    fill
                    priority={true}
                  />
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>
            <div className="w-full h-full aspect-w-3 aspect-h-4">
              <Image
                src="/no-image-found.webp"
                alt=""
                className="object-cover object-center"
                fill
              />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      <button
        className="product-image-swiper-next arrow"
        style={{
          width: `${buttonSize}`,
          height: `${buttonSize}`,
          opacity: buttonOpacity,
        }}
      >
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
  );
};

export default ProductImages;
