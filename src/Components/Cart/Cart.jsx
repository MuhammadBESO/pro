import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Cart() {
let{cart,setCart,getProductToCart,UpdateProductToCart,loading,deleteProductToCart,clearCart}=  useContext(CartContext)
  
useEffect(()=>{
  getProductToCart()
  
},[])
  
  return <>
  
  {loading?<Loading/>:
  <div>
{cart?<div className="relative overflow-x-auto w-full max-w-6xl mx-auto mt-24 shadow-md sm:rounded-lg p-4">
 
  <div className='flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4'>
    <h1 className='text-3xl sm:text-4xl font-semibold mb-2 text-green-500 sm:mb-0'>Cart Shop</h1>
  <Link to={"/checkout"}>  <button className='font-medium lg:border-green-600 lg:border lg:px-8 lg:py-3 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 hover:text-white'>Checkout</button></Link>
  </div>
  
  <div className='flex flex-col sm:flex-row justify-between my-6'>
    <h1 className='text-lg lg:text-2xl font-bold mb-2 sm:mb-0'>
      Total Price: <span className='text-green-500 font-medium '>{cart.data.totalCartPrice} EGP</span>
    </h1>
    <h1 className='text-lg lg:text-2xl font-bold'>
      Total Number Of Items: <span className='text-green-500 font-medium '>{cart.numOfCartItems}</span>
    </h1>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 my-4 dark:bg-gray-700 dark:text-gray-400">
        <tr className='text-center'>
          <th scope="col" className="px-4 py-3 sm:px-6">
            <span className="sr-only">Image</span>
          </th>
          <th scope="col" className="px-4 py-3 sm:px-6">
            Product
          </th>
          <th scope="col" className="px-4 py-3 sm:px-6">
            Qty
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
        {cart?.data.products.map((product) => (
          <tr key={product.product.id} className="bg-white border-b  dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-2 sm:p-2">
              <img
                src={product.product.imageCover}
                className="w-32 sm:w-24 md:w-32 lg:w-24 xl:w-32 max-w-full max-h-full object-cover"
                alt={product.product.title}
              />
            </td>
            <td className="px-2 sm:px-6 py-2 sm:py-4 font-semibold  text-center text-green-500 lg:text-2xl dark:text-white">
              {product.product.title?.split(" ").slice(0, 2).join(" ")}
            </td>
            <td className="px-2  sm:px-6 py-2 sm:py-4">
              <div className="flex items-center justify-center">
                <button onClick={()=> UpdateProductToCart(product.product.id , product.count-1)} className="inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                  <span className="sr-only">Decrease Quantity</span>
                  <svg className="lg:w-3 w-2  h-2 lg:h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                  </svg>
                </button>
                <div>
                  <span>{product.count}</span>
                </div>
                <button onClick={()=> UpdateProductToCart(product.product.id , product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                  <span className="sr-only">Increase Quantity</span>
                  <svg className="lg:w-3 w-2  h-2 lg:h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </td>
            <td className="px- text-center sm:px-6 py-2 sm:py-4 font-semibold text-green-500 dark:text-white">
              {product.price} EGP
            </td>
            <td className="px-2 text-center sm:px-6 py-2 sm:py-4">
              <Link onClick={()=> deleteProductToCart(product.product.id)} className="font-medium lg:border-red-600 lg:border lg:p-3 p-1 lg:bg-transparent rounded-md bg-red-600 text-white lg:text-red-600 duration-100 dark:text-red-500 hover:bg-red-600 hover:text-white">Remove</Link>
            </td>
          </tr>
        ))}
        
      </tbody>
     
     
   
    </table>
    <div className='flex justify-center py-3'>
     <Link onClick={()=>clearCart()}   className='font-medium lg:border-green-600 lg:border lg:px-8 lg:py-3 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 hover:text-white ' >Clear Cart</Link>
     </div>
  </div>
</div>:
 <div className='text-center shadow-lg  mx-auto lg:w-3/4 w-full mt-20 px-5 h-screen  flex items-center justify-center py-5'>
<h1 className='text-2xl uppercase text-red-500'>your cart is empty🗑️</h1>
</div> 

}
</div>

}
  </>
}
