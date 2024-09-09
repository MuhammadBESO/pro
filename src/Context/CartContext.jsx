import axios from "axios";
import { createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";



export let CartContext = createContext()
export function CartContextProvider({children}){
let headers={
  token:  localStorage.getItem('userToken')
}
const[cart,setCart]=useState()
const[cartN,setCartN]=useState()

const[loading,setLoading]=useState(false)


async function deleteProductToCart(productId) {
    try{
        setLoading(true)
let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}) 



setCart(data)
setLoading(false)
    }catch(err){
console.log(err);
setLoading(false)
    }
}
async function clearCart() {
    try{
        setLoading(true)
let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}) 



setCart(null);


setLoading(false)
    }catch(err){
console.log(err);
setLoading(false)
    }
}



async function checkout(shippingAddress ) {
    
    
    try{
        setLoading(true)
let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`,{shippingAddress},{headers}) 


console.log(data);
console.log(cart.data._id );
window.location.href=data.session.url

setLoading(false)
    }catch(err){
console.log(err);
setLoading(false)
    }
}
async function UpdateProductToCart(productId,count) {
    try{
        setLoading(true)
let {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers}) 


console.log(data);

setCart(data)
setLoading(false)
    }catch(err){
console.log(err);
setLoading(false)
    }
}
async function getProductToCart(productId) {
    try{
        setLoading(true)
let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers}) 

setCartN(data.numOfCartItems);


setCart(data)
setLoading(false)
    }catch(err){
console.log(err);
setLoading(false)
    }
}

async function addProductToCart(productId) {
    
    
    try{
        setLoading(true)
let {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{headers}) 

toast.success("It has been successfully added 🛺", {
    style: {
        background: 'white',
        color: '#43cb43',
    },
    position: "top-right", 
    autoClose: 3000, 
});
console.log(data);

setCart(data)
setLoading(false)
    }catch(err){
console.log(err);
setLoading(false)
    }
}
useEffect(()=>{
    getProductToCart()
},[])
return<CartContext.Provider value={{loading,clearCart,checkout, setCartN,addProductToCart,getProductToCart,deleteProductToCart,cart,setCart,UpdateProductToCart}}>
    {children}
</CartContext.Provider>

}