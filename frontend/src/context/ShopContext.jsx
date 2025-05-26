import React, { createContext, useState, useEffect } from 'react';
import { products as importedProducts } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const ShopContext = createContext();

function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('decodeToken error:', e);
    return null;
  }
}

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState(importedProducts);
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setTokenState] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState(null); // New state for delivery info
  const navigate = useNavigate();

  // On mount, load token from localStorage if exists and validate it
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('useEffect mount: storedToken:', storedToken);
    if (storedToken) {
      const valid = isTokenValid(storedToken);
      console.log('useEffect mount: token valid?', valid);
      if (valid) {
        setTokenState(storedToken);
      } else {
        localStorage.removeItem('token');
      }
    }
  }, []);
  
  // Function to check if token is valid (not expired)
  const isTokenValid = (token) => {
    try {
      const decoded = decodeToken(token);
      console.log('isTokenValid: decoded token:', decoded);
      // If exp is missing, consider token valid
      if (decoded) {
        if (!decoded.exp) {
          return true;
        }
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log('isTokenValid: error decoding token:', error);
      return false;
    }
  };

  // New function to validate delivery info before checkout
  const validateDeliveryInfo = () => {
    if (!deliveryInfo || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.zip) {
      toast.error('Please fill up delivery information first');
      return false;
    }
    return true;
  };

  // Wrapper to set token in state and localStorage without validation (temporary for testing)
  const setToken = (newToken) => {
    console.log('ShopContext: setToken called with:', newToken);
    if (newToken) {
      setTokenState(newToken);
      localStorage.setItem('token', newToken);
    } else {
      setTokenState('');
      localStorage.removeItem('token');
    }
  };

  const logout = () => {
    setToken('');
    navigate('/login');
  };

  const addToCart = async (itemId, size) => {
    if (!token) {
      toast.info('Please log in first');
      navigate('/login');
      return;
    }
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

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
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    if (!token) {
      console.log('No token found, skipping product list fetch');
      return;
    }
    if (!isTokenValid(token)) {
      logout();
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(backendUrl + '/api/product/listPublic', config);

      if (response.data.success) {
        console.log('getProductsData: products received:', response.data.products.length);
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('Error in getProductsData:', error);
      if (error.response && error.response.status === 401) {
        // Unauthorized, logout silently without toast
        logout();
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };

  useEffect(() => {
    console.log('Token state changed:', token);
    getProductsData();
  }, [token]);

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
        logout,
        deliveryInfo,
        setDeliveryInfo,
        validateDeliveryInfo,
        logToken: () => console.log('ShopContext: current token:', token),
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
