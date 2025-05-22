import React, { createContext, useState , useEffect } from 'react';
import { products as importedProducts } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
   const [products, setProducts] = useState(importedProducts);
  // const [products, setProducts] = useState([]);
  const currency = '$';
  const delivery_fee=10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const[search,setSearch]=useState('');
  const [showSearch,setShowSearch]=useState(false);
  const [cartItems,setCartItems]=useState({});
  const [token,setTokenState] = useState('')
  const navigate=useNavigate();

  // On mount, load token from localStorage if exists
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  // Wrapper to set token in state and localStorage
  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    setToken(null);
    // Optionally clear other user data here if needed
    navigate('/login');
  };

  const addToCart = async (itemId,size) => {
       if(!token){
         toast.info('Please log in first');
         navigate('/login');
         return;
       }
       if(!size){
        toast.error('Select Product Size');
        return;
       }

      let cartData= structuredClone(cartItems);
      
      if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size] +=1;
        }else{
          cartData[itemId][size]=1;
        }

      }
      else{
        cartData[itemId]={};
        cartData[itemId][size]=1;
      }
      setCartItems(cartData);
  }

const getCartCount = () => {
  let totalCount = 0;
  if (!cartItems) return totalCount;
  
  for (const itemId in cartItems) {
    const itemSizes = cartItems[itemId];
    for (const size in itemSizes) {
      const quantity = itemSizes[size];
      if (quantity > 0) {
        totalCount += quantity;
      }
    }
  }
  return totalCount;
}

const updateQuantity = async (itemId,size,quantity) =>{
    let cartData= structuredClone(cartItems);
    cartData[itemId][size]=quantity;

    setCartItems(cartData);
}

 const getCartAmount=  () =>{
  let totalAmount = 0;
  for(const items in cartItems){
    let itemInfo= products.find((product)=>product._id === items);
    for(const item in cartItems[items]){
      try{
        if(cartItems[items][item]>0){
          totalAmount+=itemInfo.price*cartItems[items][item];
        }
      }catch(error){

      }
    }
  }
  return totalAmount;
 }

  const getProductsData = async () => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axios.get(backendUrl + '/api/product/list', config);
    
    if (response.data.success) {
      // If you want to show all products (including best sellers), remove filtering:
      setProducts(response.data.products);

      // Or filter only visible ones if needed
      // const visibleProducts = response.data.products.filter(product => product.isVisible !== false);
      // setProducts(visibleProducts);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

  
  
  useEffect(()=>{
    getProductsData()
  },[token])

  return (
    <ShopContext.Provider value={{ products, setProducts, currency,delivery_fee,
     search,setSearch,showSearch,setShowSearch,cartItems,addToCart,getCartCount,updateQuantity , getCartAmount , navigate ,
     backendUrl,setToken,token,logout
     }}>
      {children}
    </ShopContext.Provider>
  );
};
 export default ShopContextProvider;
