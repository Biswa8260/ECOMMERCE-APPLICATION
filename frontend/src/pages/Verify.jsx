import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const Verify = () => {

    const [searchParama,setSearchParams] = useSearchParams()
    const { navigate, token, setCartItems , backendUrl} = useContext(ShopContext)

    const success = searchParama.get('success')
    const orderId = searchParama.get('orderId')
    const verifyPayments = async () =>{
        try {
            if (!token) {
                return null
                
            }
            const response = await axios.post(backendUrl+ '/api/order/verifyStripe',{success,orderId},{headers:{token}})
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            }else{
                navigate('/cart')
            }
        } catch (error) {
          console.log(error)  
          toast.error(error.message)
        }  
    }

    useEffect(()=>{
        verifyPayments()
    },[token])
  return (
    <div>
      
    </div>
  )
}

export default Verify
