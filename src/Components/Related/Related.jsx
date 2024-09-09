// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import Slider from "react-slick";
// import { CartContext } from "../../Context/CartContext";
// import Loading from "../Loading/Loading";
// import { WishlistContext } from "../../Context/WishlishContext";
// import Related from "../Related/Related";

// const { addProductToCart, loading } = useContext(CartContext);
// const [productDetail, setProductDetails] = useState({});
// const { addProductToWhishlist, deleteProductToWishlist, isloading } =
//   useContext(WishlistContext);





// export default function Related(related) {
   
//     return (
//     <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
//       <div className="product p-3 bg-white shadow-lg rounded-md">
//         <Link to={`/productdetails/${related.id}`}>
//           <img
//             className="w-full h-auto rounded-t-md"
//             src={related.imageCover}
//             alt={related.title}
//           />
//           <h2 className="text-xl font-semibold mt-2 text-green-500">
//             {related.category.name}
//           </h2>
//           <h2 className="text-lg mt-1">
//             {related.title.split(" ").slice(0, 2).join(" ")}
//           </h2>
//           <div className="flex justify-between mt-2">
//             <p>{related.price} EGP</p>
//             <p>
//               <i className="fa-solid fa-star text-xl text-yellow-400"></i>
//               <span className="text-xl"> {related.ratingsAverage}</span>
//             </p>
//           </div>
//         </Link>
//         <div className="flex justify-between items-center mt-2">
//           {loading ? (
//             <Loading />
//           ) : (
//             <button
//               onClick={() => addProductToCart(related.id)}
//               className="px-5 py-2 w-3/4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//             >
//               Add +
//             </button>
//           )}
        
//           <div>
//             {isloading ? (
//               <Loading />
//             ) : (
//               <i
//                 onClick={handleClick}
//                 style={style}
//                 className="fa-solid fa-heart text-2xl cursor-pointer text-red-500 hover:text-red-600 transition"
//               ></i>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
