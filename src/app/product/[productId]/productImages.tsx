import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const ProductImages = ({ images }: any) => {
  return (
    <div className="w-2/3">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{ clickable: true }}
        navigation
      >
        {images?.map((image: any, index: number) => {
          return (
            <SwiperSlide className="" key={index}>
              <Image
                src={image}
                alt=""
                className="rounded-lg"
                width={0}
                height={0}
                layout="responsive"
                priority={true}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductImages;