import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <div className='flex items-center h-screen'>
<div className="w-3/4 mt-24 bg-gray-50 flex mx-auto items-center">
  <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
    <div className="w-full lg:w-1/2 mx-8">
      <div className="text-7xl text-green-500 font-dark font-extrabold mb-8"> 404</div>
      <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
        Sorry we couldn't find the page you're looking for
      </p>
      <Link to={"/"} className="font-medium lg:border-green-600 lg:border lg:px-8 lg:py-3 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 hover:text-white ">back to homepage</Link>
    </div>
    <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
      <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg" className alt="Page not found" />
    </div>
  </div>
</div>
    </div>

  )
}
