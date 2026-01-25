import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoIosGift } from "react-icons/io";


const Slider = () => {
    return (


        <div>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div
                    className="w-full relative overflow-hidden "
                    style={{
                        backgroundImage:
                            "url('https://i.ibb.co.com/n8zX5MfT/550e53c9-a13c-4ba7-99e1-75815be3941a.jpg')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                    }}
                >
                   
                    <div className=" inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/10"></div>

                   
                    <div className="relative h-[220px] md:h-[470px] flex items-center">
                        <div className="max-w-7xl mx-auto px-4 md:px-12 w-full">

                          
                            <div className="max-w-xl text-green-300 space-y-1">
                                <h1 className="text-md sm:text-2xl md:text-4xl font-bold leading-tight">
                                    Where Tradition Meets  Trust <br /> in Every Product
                                </h1>

                                <p className="text-xs sm:text-sm md:text-base text-gray-200">
                                    Directly from Home, Farm & Local Sellers
                                </p>

                                <button className="bg-green-600 hover:bg-green-700 text-white px-5  md:px-6 md:py-2  font-medium shadow transition">
                                    Shop Now
                                </button>
                            </div>
                        </div>
                    </div>

                  
                    <div className="absolute bottom-1 right-0 md:bottom-6 md:right-6">
                        <div className=" text-yellow-500   px-4 py-3 text-center ">
                            <IoIosGift className=" text-3xl md:text-8xl  mx-auto" />
                            <p className="text-sm ">
                                New User Coupon
                            </p>
                            <p className="text-sm md:text-lg md:font-bold tracking-wide text-green-300">
                                NEWUSER20
                            </p>
                        </div>
                    </div>
                </div>



            </Carousel>
        </div>

    );
};

export default Slider;


