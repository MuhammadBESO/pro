import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { WishlistContext } from "../../Context/WishlishContext";
import toast from "react-hot-toast";
import { debounce } from 'lodash';

export default function ProductDisplay({ product, matchingIds }) {
  const { addProductToCart, loading } = useContext(CartContext);
  const { addProductToWhishlist, deleteProductToWishlist, isloading } = useContext(WishlistContext);

  // Determine if the heart should be red initially based on matchingIds
  const [isRed, setIsRed] = useState(matchingIds.includes(product.id));

  // Update the state whenever matchingIds changes
  useEffect(() => {
    setIsRed(matchingIds.includes(product.id));
  }, [matchingIds, product.id]);

  // Debounce the function to avoid multiple invocations
  const handleClickDebounced = useCallback(debounce(async (productId) => {
    if (isRed) {
      await deleteProductToWishlist(productId);
      toast.success("Product removed from wishlist😒", {
        style: {
          background: "white",
          color: "#43cb43",
        },
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      await addProductToWhishlist(productId);
      toast.success("It has been successfully added ❤️", {
        style: {
          background: "white",
          color: "#43cb43",
        },
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, 300), [isRed, addProductToWhishlist, deleteProductToWishlist]);

  const handleClick = () => {
    setIsRed(prevIsRed => !prevIsRed);
    handleClickDebounced(product.id);
  };

  const style = {
    color: isRed ? "red" : "gray",
    cursor: "pointer"
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
      <div className="product p-3 bg-white shadow-lg rounded-md">
        <Link to={`/productdetails/${product.id}`}>
          <img
            className="w-full h-auto rounded-t-md"
            src={product.imageCover}
            alt={product.title}
          />
          <h2 className="text-xl font-semibold mt-2 text-green-500">
            {product.category.name}
          </h2>
          <h2 className="text-lg mt-1">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between mt-2">
            <p>{product.price} EGP</p>
            <p>
              <i className="fa-solid fa-star text-xl text-yellow-400"></i>
              <span className="text-xl "> {product.ratingsAverage}</span>
            </p>
          </div>
        </Link>
        <div className="flex justify-between items-center mt-2">
          {loading ? (
            <Loading />
          ) : (
            <button
              onClick={() => addProductToCart(product.id)}
              className="px-5 py-2 w-3/4 bg-green-600 text-white rounded-md hover:bg-green-600 transition"
            >
              Add +
            </button>
          )}
          <div className="">
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
  );
}
