import React, { useContext, useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlishContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  let { cart, setCartN } = useContext(CartContext);
  let { wishlist, getProductToWishlist } = useContext(WishlistContext);

  function signOut() {
    setUserData("");
    localStorage.removeItem("userToken");
    navigate("/login");
  }
// useEffect(()=>{getProductToWishlist()},[])
  return (
    <>
      <nav className="bg-slate-100 border-gray-200 fixed top-0 left-0 right-0 z-50  dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <i className="text-green-500 text-3xl fa-solid fa-cart-shopping"></i>
            <span className="self-center uppercase text-2xl font-semibold whitespace-nowrap dark:text-white">
              fresh cart
            </span>
          </a>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden lg:flex lg:w-auto" id="navbar-default">
            {userData && (
              <ul className="font-medium  mb-4 flex flex-col lg:flex-row lg:space-x-8 rtl:space-x-reverse p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:border-0   ">
                <li>
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={"/cart"}>Cart</NavLink>
                </li>
                <li>
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
                <li>
                  <NavLink to={"/wishlist"}>Wish list</NavLink>
                </li>
                <li>
                  <NavLink to={"/categories"}>Categories</NavLink>
                </li>
                <li>
                  <NavLink to={"/brands"}>Brands</NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className="hidden lg:flex lg:space-x-3 items-center">
            {!userData && (
              <>
                <NavLink
                  to={"/register"}
                  className="font-medium lg:border-green-600 lg:border lg:px-4 lg:py-2 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 hover:text-white "
                >
                  Register
                </NavLink>
                <NavLink
                  to={"/login"}
                  className="font-medium lg:border-green-600 lg:border lg:px-4 lg:py-2 p-2 lg:bg-transparent rounded-md bg-green-600 text-white lg:text-green-600 duration-100  hover:bg-green-600 hover:text-white "

                >
                  Login
                </NavLink>
              </>
            )}
            {userData && (
              <>
                <button
                  className="font-medium lg:border-red-600 lg:border lg:px-4 lg:py-2 p-2 lg:bg-transparent rounded-md bg-red-600 text-white lg:text-red-600 duration-100  hover:bg-red-600 hover:text-white "
                  onClick={signOut}
                >
                  Sign Out
                </button>
                <NavLink
                  to={"/cart"}
                  className="relative text-gray-600 text-2xl"
                >
                  <i className="fa-solid fa-cart-shopping">
                    <span className="text-white rounded-sm bg-green-500 px-1 text-xs bottom-4 absolute -right-2">
                      {cart ? cart.numOfCartItems : 0}
                    </span>
                  </i>
                </NavLink>
                <NavLink
                  to={"/wishlist"}
                  className="relative text-red-600 text-2xl"
                >
                  <i className="fa-solid fa-heart">
                    <span className="text-white rounded-sm bg-green-500 px-1 text-xs bottom-4 absolute -right-2">
                      {wishlist ? wishlist.count : 0}
                    </span>
                  </i>
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div
          className={`mobile-menu z-20 ${
            isOpen ? "block" : "hidden"
          } bg-slate-100 absolute w-full lg:hidden transition-transform duration-1000 transform ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {userData && (
            <ul className=" ">
              <li className="hover:bg-slate-200 ps-3 py-3 ">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="hover:bg-slate-200 ps-3 py-3 ">
                <NavLink to={"/cart"}>Cart</NavLink>
              </li>
              <li className="hover:bg-slate-200 ps-3 py-3 ">
                <NavLink to={"/products"}>Products</NavLink>
              </li>
              <li className="hover:bg-slate-200 ps-3 py-3 ">
                <NavLink to={"/wishlist"}>Wish list</NavLink>
              </li>
              <li className="hover:bg-slate-200 ps-3 py-3 ">
                <NavLink to={"/categories"}>Categories</NavLink>
              </li>
              <li className="hover:bg-slate-200 ps-3 py-3 ">
                <NavLink to={"/brands"}>Brands</NavLink>
              </li>
            </ul>
          )}
          <ul className="flex flex-col  text-center    mt-4">
            {!userData && (
              <>
                <li className=" ps-3 py-3 ">
                  {" "}
                  <Link
                    className="rounded-md w-3/4 mx-auto bg-green-500 text-white px-4 py-2 block"
                    to={"/register"}
                  >
                    Register
                  </Link>
                </li>
                <li className=" ps-3 py-3 ">
                  <Link
                    className="rounded-md w-3/4 mx-auto bg-green-500 text-white px-4 py-2 block"
                    to={"/login"}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            {userData && (
              <>
                <li className="hover:bg-slate-200 ps-3 py-3 ">
                  <button
                    className=" rounded-md w-3/4 mx-auto bg-red-500 text-white px-4 py-2 "
                    onClick={signOut}
                  >
                    Sign Out
                  </button>
                </li>
                <li className="relative hover:bg-slate-200 ps-3 py-3 ">
                  <NavLink
                    to={"/cart"}
                    className="text-gray-600 text-2xl relative"
                  >
                    <i className="fa-solid fa-cart-shopping">
                      <span className="text-white rounded-sm bg-green-500 px-1 py-0.5 text-xs absolute top-[-3px] right-[-10px] lg:top-[-5px] lg:right-[-5px]">
                        {cart ? cart.numOfCartItems : 0}
                      </span>
                    </i>
                  </NavLink>
                </li>
                <li className="relative hover:bg-slate-200 ps-3 py-3 ">
                  <NavLink
                    to={"/wishlist"}
                    className="text-red-600 text-2xl relative"
                  >
                    <i className="fa-solid fa-heart relative">
                      <span className="text-white rounded-sm bg-green-500 px-1 py-0.5 text-xs absolute top-[-5px] right-[-10px] lg:top-[-10px] lg:right-[-5px]">
                        {wishlist ? wishlist.count : 0}
                      </span>
                    </i>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
