import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const Slider = ({imgUrls}) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {imgUrls.map((imgUrl, index) => (
        <SwiperSlide key={imgUrl + index}>
          <div className="top-slider" style={{background: `url(${imgUrl}) center center no-repeat`, backgroundSize: "cover"}}></div>
        </SwiperSlide>)
      )}
    </Swiper>
  )
}

export default Slider