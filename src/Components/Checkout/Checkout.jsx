import React, { useContext, useState } from 'react'
import tailwindConfig from '../../../tailwind.config'
import { useFormik } from 'formik'
import * as yup from"yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Loading from '../Loading/Loading'
import { CartContext } from '../../Context/CartContext'
export default function Checkout() {
const [isloadng,setIsLoading]=useState(false)
const{checkout} =useContext(CartContext)
let{ handleChange ,handleSubmit,values,handleBlur,errors, touched }= useFormik({
  initialValues:{
  
    "details":"",
    "city":"",
    "phone":"",
   
  },onSubmit:checkout,
  
  validationSchema:yup.object({
  
    details:yup.string().required(" Addrees Details is required"),
city:yup.string().required("city is required").min(3,"city lenght must be at least 3 characters").max(20,"Name lenght must be at most 20 characters")

,phone:yup.string().required("phone is required").matches(/^01\d{9}$/,"invalid Phone")
  })
})








   
 return <>
 
<div className='mt-24  w-full  lg:w-4/5 lg:mx-auto '>
<div className="w-full  shadow-md  dark:bg-gray-800 rounded-lg  px-10 py-4   flex flex-col items-center">
    <h1 className="text-4xl font-semibold me-auto text-green-500  dark:text-gray-200 mb-5">Check out</h1>
    <form  onSubmit={handleSubmit} action="#" className="w-full flex  flex-col  gap-4">
      <div className="flex items-start flex-col justify-start">
      
    

      

      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2"> Addrees Details:</label>
        <input type="text" id="email" value={values.details} onBlur={handleBlur} onChange={handleChange}  name="details" className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
        {touched.details&& errors.details &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.details}</p>
        </div>}
      </div>

      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="city" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">City:</label>
        <input type="text" id="city" value={values.city} onBlur={handleBlur} onChange={handleChange}  name="city" className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
        {touched.city&& errors.city &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.city}</p>
        </div>}
      </div>
      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="phone" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">Phone:</label>
        <input type="tel" id="phone" value={values.phone} onBlur={handleBlur} onChange={handleChange}  name="phone" className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
        {touched.phone&& errors.phone &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.phone}</p>
        </div>}
      </div>

   

   </div>
   <button type="submit" className="font-medium mb-4 lg:border-green-600 lg:border lg:px-8 lg:py-3 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 uppercase hover:text-white">Check out</button>

    </form>
  
  
   
  </div>
</div>
  

{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" integrity="sha512-PgQMlq+nqFLV4ylk1gwUOgm6CtIIXkKwaIHp/PAIWHzig/lKZSEGKEysh0TCVbHJXCLN7WetD8TFecIky75ZfQ==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */}



{isloadng&&<div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
 <Loading/>
</div>}

  

  


  </>
}
