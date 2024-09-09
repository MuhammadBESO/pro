import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { WishlistContext } from "../../Context/WishlishContext";
// import Related from "../Related/Related";

export default function ProductDetails({ matchingIds }) {
  const { addProductToCart, loading } = useContext(CartContext);
  const [productDetail, setProductDetails] = useState({});
  const [relatedProduct, setRelatedProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { addProductToWhishlist, deleteProductToWishlist, isloading } =
    useContext(WishlistContext);

  async function getProductDetails(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
      getRelatedProduct(data.data.category._id)
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getRelatedProduct(categoryId) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,{params:{"category":categoryId}}
      );
    setRelatedProduct(data.data)
    console.log(data.data);
    
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setIsLoading(false);
    }
  }
  

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    if (matchingIds && Array.isArray(matchingIds)) {
      setIsRed(matchingIds.includes(productDetail.id));
    }
  }, [matchingIds, productDetail.id]);

  const handleClick = () => {
    setIsRed((prevIsRed) => {
      const newIsRed = !prevIsRed;

      if (newIsRed) {
        addProductToWhishlist(productDetail.id);
      } else {
        deleteProductToWishlist(productDetail.id);
      }

      return newIsRed;
    });
  };

  const style = {
    color: isRed ? "red" : "gray",
    cursor: "pointer",
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-w-screen min-h-screen flex items-center mt-5 p-1 lg:p-5 overflow-hidden relative">
          <div className="w-full max-w-6xl rounded bg-white shadow-xl p-8 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-5">
              <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                <div className="relative">
                  <Slider {...settings}>
                    {productDetail.images?.map((image, index) => (
                      <img key={index} src={image} alt="" />
                    ))}
                  </Slider>
                  <div className="absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 px-10">
                <div className="mb-10">
                  <h1 className="font-bold uppercase text-2xl mb-5 text-green-500 ">
                    {productDetail.slug}
                  </h1>
                  <p className="text-sm text-gray-500">{productDetail.description}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p>{productDetail.price} EGP</p>
                  <p>
                    <i className="fa-solid fa-star text-yellow-400 text-xl"></i>{" "}
                   <span className="text-xl">  {productDetail.ratingsAverage}</span>
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  {loading ? (
                    <Loading />
                  ) : (
                    <button
                      onClick={() => addProductToCart(productDetail.id)}
                      className="px-5 bg-green-500  w-3/4 py-2 rounded-md text-white"
                    >
                      Add +
                    </button>
                  )}
                  {isloading ? (
                    <Loading />
                  ) : (
                    <i
                      onClick={handleClick}
                      style={style}
                      className="fa-solid fa-heart text-2xl cursor-pointer text-red-500 hover:text-red-600 transition"
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

<div>
  <div className=" w-full text-center flex justify-center">
   <h1 className="text-3xl text-green-500 font-bold uppercase">  related Product</h1>
  </div>
{/* <div  className="flex flex-wrap justify-center  lg:gap-2">
  {relatedProduct?.map((related,index) => {return(
    <Related
    key={index}
   related={related}
    matchingIds={matchingIds} 
    get={getProductDetails()}
   
    />
  )})}
</div> */}
</div>


    </>
  );
}
