import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext'; // Ensure the path is correct
import Loading from '../Loading/Loading';

export default function ResetPass() {
  const { setUserData } = useContext(UserContext); // Ensure setUserData is defined
  const [apierror, setApiError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values, handleBlur, errors, touched } = useFormik({
    initialValues: {
      resetCode: ''
    },
    onSubmit: reset,
    validationSchema: yup.object({
      resetCode: yup.string().required('Reset code is required').matches(/^\d{6}$/, 'Code is incorrect')
    })
  });

  async function reset(){
    try{
     setIsLoading(true)
     let {data} =  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
    console.log(data);
   
    setIsLoading(false)
    setUserData(data.token)
    navigate("/updatepassword")
    localStorage.setItem("userToken",data.token)
    }
    catch (err){
    
     console.log(err.response.data.message);
     setApiError(err.response.data.message)
     setIsLoading(false)
    }
      }

  return (
    <>
      <div className='mt-24  w-full  lg:w-4/5 lg:mx-auto'>
        <div className="w-full  shadow-md  dark:bg-gray-800 rounded-lg  px-10 py-4   flex flex-col items-center">
          <h1 className="text-4xl font-semibold me-auto text-green-500  dark:text-gray-200 mb-5">Reset Code</h1>
          <form onSubmit={handleSubmit} action="#" className="w-full flex flex-col gap-4">
            <div className="flex items-start flex-col justify-start">
              {apierror && <div className='rounded-md py-3 px-3 mb-2 w-full bg-red-300'>{apierror}</div>}
              <div className="flex w-full items-start flex-col justify-start mb-5">
                <label htmlFor="resetCode" className="text-lg  font-semibold text-gray-700 dark:text-gray-200  mb-2">Reset Code:</label>
                <input
                  type="text"
                  id="resetCode"
                  value={values.resetCode}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="resetCode"
                  className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"
                />
                {touched.resetCode && errors.resetCode && (
                  <div className='w-full bg-red-200 border-red-400 mt-3 border-2 rounded-md ps-2'>
                    <p className='text-red-700 w-fit py-3 ps-0 me-auto'>{errors.resetCode}</p>
                  </div>
                )}
              </div>
              <button type="submit" className="mb-4 w-full mx-auto font-medium lg:border-green-600 lg:border lg:px-8 lg:py-3 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 uppercase hover:text-white">rest code</button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50"><Loading /></div>}
    </>
  );
}
