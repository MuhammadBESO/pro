import React, { useContext, useState } from 'react'
import tailwindConfig from '../../../tailwind.config'
import { useFormik } from 'formik'
import * as yup from"yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import Loading from '../Loading/Loading'
export default function ForgettenPassword() {

let{ handleChange ,handleSubmit,values,handleBlur,errors, touched }= useFormik({
  initialValues:{
  
    "email":""
    
   
  },
  onSubmit:forget,
  validationSchema:yup.object({
  
  email:yup.string().required("email is required").matches(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,"Email pattern is inavalid")
  

  })
})


const [apierror,setApiError]=useState()
const [isloadng,setIsLoading]=useState(false)
let navadiate=useNavigate()
let{setUserData}= useContext(UserContext)

let navagiate= useNavigate()
  async function forget(){
 try{
  setIsLoading(true)
  let {data} =  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
 console.log(data);

 setIsLoading(false)
 setUserData(data.token)
 navadiate("/resetpassword")
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
    <h1 className="text-4xl font-semibold me-auto text-green-500  dark:text-gray-200 mb-5">Verify your email:</h1>
    <form  onSubmit={handleSubmit} action="#" className="w-full flex  flex-col  gap-4">
      <div className="flex items-start flex-col justify-start">
      
     {apierror&&<div className='rounded-md py-3 px-3 mb-2 w-full bg-red-300'>{apierror}</div>}

      

      <div className="flex w-full items-start flex-col justify-start mb-5">
        <label htmlFor="email" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">Current Email:</label>
        <input type="email" id="email" value={values.email} onChange={handleChange}  name="email" className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"/>
        {touched.email&& errors.email &&  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2  '>
    <p className='text-red-700 w-fit   py-3 ps-0 me-auto '>{errors.email}</p>
        </div>}
      </div>

     

  

      <button type="submit" className="mb-4 w-full mx-auto font-medium lg:border-green-600 lg:border lg:px-8 lg:py-3 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 uppercase hover:text-white">verify Email </button>
   </div>
    </form>
  
  
   
  </div>
</div>
  

{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" integrity="sha512-PgQMlq+nqFLV4ylk1gwUOgm6CtIIXkKwaIHp/PAIWHzig/lKZSEGKEysh0TCVbHJXCLN7WetD8TFecIky75ZfQ==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */}



{isloadng&&<div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50">
 <Loading/>
</div>}

  

  


  </>
}
