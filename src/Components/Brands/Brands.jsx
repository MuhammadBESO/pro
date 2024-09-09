import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import Footer from '../Footer/Footer'

export default function Brands() {
  let [brands,setBrands]=useState()
  let [loading,setLoading]=useState(false)
  async function brandsProduct() {
    setLoading(true)
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
    console.log(data.data)
    setBrands(data.data)
    setLoading(false)
  }
  
  useEffect(()=>{
    brandsProduct()
  },[])
  
  return <>
  <h1 className='text-4xl my-3 mt-24 text-green-500 font-bold  text-center'>All Brands</h1>
{loading?<Loading/>:<div className='w-3/4 flex flex-wrap gap-2 justify-center    mx-auto '>
{brands?.map((brand)=>  <>
  <div className=' border-slate-200 rounded-md border-2 brand  text-center p-3'>
    <img src={brand.image} alt="" srcset="" />
    <h1>{brand.name}</h1>
  </div>
  
  
  </>)}
</div>}
<Footer />
 
  </>
}
