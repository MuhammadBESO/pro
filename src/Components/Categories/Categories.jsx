import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import Footer from '../Footer/Footer'

export default function Categories() {
  let [categories,setategories]=useState()
  let [loading,setLoading]=useState(false)
  async function categoriesProduct() {
    setLoading(true)
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    console.log(data.data)
    setategories(data.data)
    setLoading(false)
  }
  
  useEffect(()=>{
    categoriesProduct()
  },[])
  
  return <>
  
  {loading ? (
  <Loading />
) : (
  <div className="w-full flex flex-wrap justify-center mt-20 gap-5 mx-auto px-4">
    {categories?.map((category) => (
      <div
        key={category.slug}
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 border-slate-200 rounded-md border-2 brand mt-5 text-center pb-3"
      >
        <div className="h-3/4">
          <img
            src={category.image}
            className="w-full h-full object-cover"
            alt={category.slug}
          />
        </div>
        <div className="h-1/4 flex justify-center items-center">
          <h1 className="text-green-600 font-bold uppercase text-lg md:text-2xl">
            {category.slug}
          </h1>
        </div>
      </div>
    ))}
  </div>
)}
  <Footer/>
  </>
}
