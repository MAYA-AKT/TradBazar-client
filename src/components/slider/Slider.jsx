import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../assets/banner/banner1.png';
import banner2 from '../../assets/banner/banner2.png';
import banner3 from '../../assets/banner/banner3.png';


const Slider = () => {
    return (
        <div className=''>
            <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
                <div>
                    <img src={banner1} className="w-full h-[150px] md:h-[200px] lg:h-[450px] object-cover"/>

                </div>
                <div>
                    <img src={banner2} className="w-full h-[150px] md:h-[200px] lg:h-[450px] object-cover"/>

                </div>
                <div>
                    <img src={banner3} className="w-full h-[150px] md:h-[200px] lg:h-[450px] object-cover"/>

                </div>
            </Carousel>
        </div>

    );
};

export default Slider;