import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


const Slider = () => {
    return (
        <>
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                loop={true}
                className="w-full"
            >
                <SwiperSlide>
                    <img
                        src="https://i.ibb.co.com/fGMmDPCZ/ey-Jp-ZCI6Im1f-Njg5-ZDY2-Mm-E1-ODc0-ODE5-MWJi-N2-Nj-Mj-E2-Zj-Yx-ZDRl-MGY6c2-Vka-W1lbn-Q6-Ly8x-Yj-Ew.jpg"
                        className="w-full object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        src="https://i.ibb.co.com/fGMmDPCZ/ey-Jp-ZCI6Im1f-Njg5-ZDY2-Mm-E1-ODc0-ODE5-MWJi-N2-Nj-Mj-E2-Zj-Yx-ZDRl-MGY6c2-Vka-W1lbn-Q6-Ly8x-Yj-Ew.jpg"
                        className="w-full object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        src="https://i.ibb.co.com/fGMmDPCZ/ey-Jp-ZCI6Im1f-Njg5-ZDY2-Mm-E1-ODc0-ODE5-MWJi-N2-Nj-Mj-E2-Zj-Yx-ZDRl-MGY6c2-Vka-W1lbn-Q6-Ly8x-Yj-Ew.jpg"
                        className="w-full object-cover h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
                    />
                </SwiperSlide>
            </Swiper>
        </>

    );
};

export default Slider;