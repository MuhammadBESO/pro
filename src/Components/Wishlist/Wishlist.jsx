import { WishlistContext } from "../../Context/WishlishContext";
import React, { useContext, useEffect } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
export default function Wishlist() {
 
    const { addProductToCart, loading } = useContext(CartContext);
    const { addProductToWhishlist, deleteProductToWishlist,isloading,getProductToWishlist,wishlist } = useContext(WishlistContext);
    

  useEffect(() => {
    getProductToWishlist();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-24">
          {wishlist ? (
            <div className="relative overflow-x-auto w-full max-w-6xl mx-auto shadow-md sm:rounded-lg p-4">

<div className='flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4'>
    <h1 className='text-3xl sm:text-4xl font-semibold mb-2 sm:mb-0 text-red-500'>Whishlist</h1>
  </div>
  
  <div className='flex flex-col sm:flex-row justify-between my-6'>
   
    <h1 className='text-lg lg:text-2xl font-bold'>
      Total Number Of Items: <span className='text-red-500 font-medium '>{wishlist.count}</span>
    </h1>
  </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 sm:px-6">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-4 py-3 sm:px-6">
                        Product
                      </th>
                      <th scope="col" className="px-4 py-3 sm:px-6">
                        remove
                      </th>
                      <th scope="col" className="px-4 py-3 sm:px-6">
                        Price
                      </th>
                      <th scope="col" className="px-4 py-3 sm:px-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlist?.data.map((product) => (
                      <tr
                        key={product.price}
                        className="bg-white border-b  dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-2 sm:p-2">
                          <img
                            src={product.imageCover}
                            className="w-32 sm:w-24 md:w-32 lg:w-24 xl:w-32 max-w-full max-h-full object-cover"
                            alt={product.name}
                          />
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 font-semibold text-gray-900 dark:text-white">
                        {product.title?.split(" ").slice(0, 2).join(" ")}
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4">
                          <Link
                            onClick={() => deleteProductToWishlist(product._id)}
                            className="font-medium lg:border-red-600 lg:border lg:p-3 p-1 lg:bg-transparent rounded-md bg-red-600 text-white lg:text-red-600 duration-100 dark:text-red-500 hover:bg-red-600 hover:text-white"
                          >
                            Remove
                          </Link>
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price} EGP
                        </td>
                        <td className="px-2 sm:px-6 py-2 sm:py-4">
                        {loading ? (
          <Loading />
        ) : (
          <Link
            onClick={() => addProductToCart(product.id)}
            className="font-medium lg:border-green-600 lg:border lg:px-8 lg:py-3 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 hover:text-white"
          >
            Add +
          </Link>
        )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              
              </div>
            </div>
          ) : (
            <div className="text-center shadow-lg w-3/4 mx-auto h-screen  flex items-center justify-center py-5">
              <h1 className="text-2xl">your cart is empty</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}
