import React from 'react'
import { Bars } from 'react-loader-spinner'
export default function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-70'>
    <Bars
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}} // Optional: Customize further if needed
      wrapperClass=""  // Optional: Add CSS class for additional styling if needed
      visible={true}
    />
  </div>
  )
}
