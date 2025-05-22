import React, { useState, useEffect , useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const{productId} =useParams();
  const {products , currency , addToCart}=useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const[image,setImage]= useState('')
  const [size,setSize]=useState('')

  const fetchProductData = async () =>{
    products.map((item)=>{
    if(item._id === productId){
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
   fetchProductData();
  },[productId,products])

  if (!productData) return <div className="flex justify-center items-center h-64">Loading product details...</div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
          {/* -----------product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                {
                  productData.image.map((item,index)=>(
                    <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' alt="" />
                  ))
                }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt=" " />

          </div>

        </div>
         {/* -------product info */}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img className='w-3.5' src={assets.star_icon} alt="" />
              <img className='w-3.5' src={assets.star_icon} alt="" />
              <img className='w-3.5' src={assets.star_icon} alt="" />
              <img className='w-3.5' src={assets.star_icon} alt="" />
               <img className='w-3.5'src={assets.star_dull_icon} alt="" />
               <p className='pl-2'>{2305}</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className=' flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' :''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Original Product.</p>
              <p>Cash On Delivery Available On This Product.</p>
              <p>Easy Return and exchange policy with in 7 days.</p>
            </div>

          </div>

      {/* Description and review section */}
     

      </div>
      <div className='mt-20'>
        <div className='flex border-b'>
          <b className='border px-5 py-3 text-sm cursor-pointer'>Description</b>
          <p className='border px-5 py-3 text-sm cursor-pointer'>Reviews{2035}</p>

        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text:sm text-gray-500'>
          <p>  Discover unmatched quality and modern style with this premium product. Designed with attention to detail and crafted from high-grade materials, it offers both comfort and durability. Whether you're upgrading your wardrobe or shopping for something special, this item delivers a perfect blend of form and function.</p>
          <p>Its sleek design is complemented by versatile sizing options, ensuring a flattering fit for every individual. Ideal for daily use or special occasions, this product is a must-have addition to your collection. Experience the perfect balance of elegance and practicality in one stylish package.</p>
        </div>
      </div>

    {/* Display related products */}
     <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  )
}

export default Product
