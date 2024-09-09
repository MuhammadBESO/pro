import axios from 'axios';
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
    const [categorySlider, setCategorySlider] = useState([]);

    async function fetchCategoryData() {
        try {
            let { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/categories`
            );
            console.log(data.data);
            setCategorySlider(data.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        touchMove: true,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200, // Medium to large screens
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 992, // Tablets and small desktops
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768, // Mobile devices
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 576, // Extra small devices
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 400, // Very small screens
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="">
            <Slider {...settings}>
                {categorySlider?.map((category, index) => (
                    <div key={index} className="text-center">
                        <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-full object-fill h-[300px] " 
                        />
                        <h3 className="mt-2 text-sm md:text-base lg:text-lg uppercase font-semibold text-green-500">{category.name}</h3>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
