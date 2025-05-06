import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const SliderSwiper = ({movies}) => {
    const navigate = useNavigate();

  return (
    <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={30}
    slidesPerView={1}
    navigation
    // pagination={{ clickable: true }}
    autoplay={{ delay: 4000 }}
    loop={true}
    className="w-full h-[80vh] md:h-[80vh]"
  >
    {movies.map((movie) => (
      <SwiperSlide key={movie.id}>
        <div
          className="w-full h-full cursor-pointer"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
            ></img>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  );
};

export default SliderSwiper;
