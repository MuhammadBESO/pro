import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Layout from "./Components/Layout/Layout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products/Products";
import Wishlist from "./Components/Wishlist/Wishlist";
import Notfound from "./Components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductsDetails/ProductDetails";
import { CartContextProvider } from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import AllOrders from "./Components/AllOrders/AllOrders";
import Checkout from "./Components/Checkout/Checkout";
import { WishlistContextProvider } from "./Context/WishlishContext";
import ForgettenPassword from "./Components/ForgettenPassword/ForgettenPassword";
import ResetPass from "./Components/ResetPass/ResetPass";
import Updatepass from "./Components/UpdatePass/Updatepass";
// import { WishlistContextProvider } from './Context/WishlishContext'

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "footer",
          element: (
            <ProtectedRoute>
              <Footer />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "navbar", element: <Navbar /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "forgettenpassword",
          element: (
            
              <ForgettenPassword />
             
          ),
        },
        {
          path: "resetpassword",
          element: (
          
              <ResetPass />
             
          ),
        },
        {
          path: "updatepassword",
          element: (
           
             <Updatepass/>
           
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <WishlistContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </CartContextProvider>
      </WishlistContextProvider>
    </>
  );
}

export default App;
