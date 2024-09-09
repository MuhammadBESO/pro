import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();
export function WishlistContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [wishlist, setWishlist] = useState(null);

  const [isloading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  async function addProductToWhishlist(productId) {
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      );

     
      

      
      setIsLoading(false);
      setSelectedProductId(productId);
      setWishlist(data);
      getProductToWishlist()
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }
  async function getProductToWishlist(productId) {
    try {
      setIsLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
console.log(data);

      setWishlist(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }
  async function deleteProductToWishlist(productId) {
    try {
      setIsLoading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
         
     
    
      
      setWishlist(data);
  
      setIsLoading(false);
      getProductToWishlist();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }






  useEffect(() => {
    getProductToWishlist();
  }, []);
  return (
    <WishlistContext.Provider
      value={{
       isloading,
        addProductToWhishlist,
        wishlist,
        setWishlist,
        selectedProductId,
        deleteProductToWishlist,
        getProductToWishlist,
        headers,setIsLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
