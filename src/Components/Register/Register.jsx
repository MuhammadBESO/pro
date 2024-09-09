import React, { useContext, useState } from 'react'
import tailwindConfig from '../../../tailwind.config'
import { useFormik } from 'formik'
import * as yup from"yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Loading from '../Loading/Loading'
export default function Register() {


let{ handleChange ,handleSubmit,values,handleBlur,errors, touched }= useFormik({
  initialValues:{
    "name": "",
    "email":"",
    "password":"",
    "rePassword":"",
    "phone":""
  },
  onSubmit:register,
  validationSchema:yup.object({
    name:yup.string().required("Name is required").min(3,"Name lenght must be at least 3 characters").max(20,"Name lenght must be at most 20 characters")
  ,email:yup.string().required("email is required").matches(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,"Email pattern is inavalid")
  ,password:yup.string().required("password is required").matches(/^[a-zA-Z][a-zA-Z0-9]{5,8}$/,"must be  * Start with a letter (either uppercase or lowercase).* Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)")
  ,rePassword:yup.string().required("repasswrd is required").oneOf([yup.ref(("password"))],"re-Password pattern is inavalid")
  ,phone:yup.string().required("phone is required").matches(/^01\d{9}$/,"invalid Phone")

  })
})


const [apierror,setApiError]=useState()
const [isloadng,setIsLoading]=useState(false)
 let{setUserData}= useContext(UserContext)

let navagiate= useNavigate()
  async function register(){
 try{
  setIsLoading(true)
  let {data} =  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
 console.log(data);
 navagiate("/")
 setIsLoading(false)
 setUserData(data.token)
 localStorage.setItem("userToken",data.token)
 }
 catch (err){
 
  console.log(err.response.data.message);
  setApiError(err.response.data.message)
  setIsLoading(false)
 }
   }



   
 return <>
 
<div className='mt-24  w-full  lg:w-4/5 lg:mx-auto'>
<div className="w-full  shadow-md  dark:bg-gray-800 rounded-lg  px-10 py-4   flex flex-col items-center">
    <h1 className="text-4xl font-semibold me-auto text-green-500  dark:text-gray-200 mb-5">Register Now</h1>
    <form  onSubmit={handleSubmit} action="#" className="w-full flex  flex-col  gap-4">
      <div className="flex items-start flex-col justify-start">
      
     {apierror&&<div className='rounded-md py-3 px-3 mb-2 w-full bg-red-300'>{apierror}</div>}

      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="name" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">Name:</label>
        <input type="text" id="name" value={values.name} onBlur={handleBlur} onChange={handleChange} name="name" className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
     {touched.name&& errors.name &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.name}</p>
        </div>}
      </div>

      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="email" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">Email:</label>
        <input type="email" id="email" value={values.email} onBlur={handleBlur}  onChange={handleChange}  name="email" className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
        {touched.email&& errors.email &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.email}</p>
        </div>}
      </div>

      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="password" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">Password:</label>
        <input type="password" id="password" value={values.password}onBlur={handleBlur}  onChange={handleChange}  name="password" className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
        {touched.password&& errors.password &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.password}</p>
        </div>}
      </div>

      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="rePassword" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">Re-password :</label>
        <input type="password" id="rePassword" value={values.rePassword} onBlur={handleBlur}  onChange={handleChange}  name="rePassword" className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
        {touched.rePassword&& errors.rePassword &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.rePassword}</p>
        </div>}
      </div>
      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="phone" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">Phone:</label>
        <input type="tel" id="phone" name="phone" value={values.phone} onBlur={handleBlur}  onChange={handleChange}  className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
        {touched.phone&& errors.phone &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.phone}</p>
        </div>}
      </div>

   </div>
   <button type="submit" className=" mb-4 font-medium lg:border-green-600 lg:border lg:px-8 lg:py-3 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 uppercase hover:text-white">Register now</button>

    </form>
  
  
   
  </div>
</div>
  

{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" integrity="sha512-PgQMlq+nqFLV4ylk1gwUOgm6CtIIXkKwaIHp/PAIWHzig/lKZSEGKEysh0TCVbHJXCLN7WetD8TFecIky75ZfQ==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */}



{isloadng&&<div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
 <Loading/>
</div>}

  

  


  </>
}
