import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slide1 from '../../assets/images/images1 (1).png';
import slide2 from '../../assets/images/images1 (2).png';
import slide3 from '../../assets/images/images1 (3).jpg';
import slide4 from '../../assets/images/images1 (4).jpg';

export default function MainSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="flex flex-col lg:flex-row w-full lg:w-3/5 mx-auto p-4 my-5">
            <div className="w-full lg:w-3/4 mb-4 lg:mb-0">
                <Slider {...settings}>
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <img src={slide1} className=' w-full h-full' alt="Slide 1" />
                    </div>
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <img src={slide2} className=' w-full h-full' alt="Slide 2" />
                    </div>
                </Slider>
            </div>
            <div className="w-full lg:w-1/4 flex flex-col ">
                <div className="w-full h-[200px] flex items-center justify-center">
                    <img src={slide3} className='object-cover w-full h-full' alt="Slide 3" />
                </div>
                <div className="w-full h-[200px] flex items-center justify-center">
                    <img src={slide4} className='object-cover w-full h-full' alt="Slide 4" />
                </div>
            </div>
        </div>
    );
}
