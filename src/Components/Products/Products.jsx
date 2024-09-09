import axios from 'axios'
import React, { useEffect, useState ,useContext} from 'react'

import ProductDisplay from '../ProductDisplay/ProductDisplay';
import Loading from '../Loading/Loading';
import { WishlistContext } from "../../Context/WishlishContext";
import Footer from '../Footer/Footer';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [recentProductIds, setRecentProductIds] = useState([]);
  const [matchingIds, setMatchingIds] = useState([]);
  const { headers } = useContext(WishlistContext);

  async function fetchRecentProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      setProducts(data.data);

      // Extract and store the IDs from the Recent Products response
      const ids = data.data.map(product => product.id);
      setRecentProductIds(ids);
    } catch (error) {
      console.error("Error fetching recent products:", error);
    }
  }

  async function fetchWishlistProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });

      // Extract and store the IDs from the Wishlist Products response
      const ids = data.data.map(product => product.id);
      setWishlistProductIds(ids);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
    }
  }

  useEffect(() => {
    fetchRecentProducts();
    fetchWishlistProducts();
  }, []);

  useEffect(() => {
    if (recentProductIds.length && wishlistProductIds.length) {
      // Compare recentProductIds and wishlistProductIds
      const matches = recentProductIds.filter(id => wishlistProductIds.includes(id));
      setMatchingIds(matches); // Update matching IDs state
    }
  }, [recentProductIds, wishlistProductIds]);




  return<>
 
 <div className="w-3/4 mx-auto  mt-24 mb-10 ">
        <input
          onChange={(e) => setSearch(e.target.value || '')}
          type="search"
          id="default-search"
          className="border-gray-300  outline-none focus:border-green-400 border-2 w-full p-2 rounded-md"
          placeholder="Search Products, Logos..."
          value={search}
        />
      </div>
  {products.length ? (
    <div className="flex flex-wrap justify-center  gap-4">
      {products
        .filter((product) => {
          const productName = product.title || '';
          return search === '' || productName.toLowerCase().includes(search.toLowerCase());
        })
        .map((product, index) => {
          return (
            <ProductDisplay
              key={index}
              product={product}
              matchingIds={matchingIds} // Pass matchingIds to ProductDisplay
            />
          );
        })}
    </div>
  ) : (
    <Loading />
  )}
   <Footer/>
</>
}
