import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

    const [list,setList]= useState([])
    const [error, setError] = useState('')

    const fetchList = async () => {
       try {
        
        const response = await axios.get(backendUrl + '/api/product/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.data.success) {
          setList(response.data.products);
        } else{
          toast.error(response.data.message)
        }
        

       } catch (error) {
        if (error.response && error.response.status === 401) {
            setError('Not authorised. Please log in again.');
            console.log('Not authorised. Please log in again.');
        } else {
            setError('Failed to fetch list.');
            console.log(error);
        }
       }
    }

     const removeProduct = async (id) =>{
         try {
            
                const response = await axios.post(backendUrl + '/api/product/remove' , {id} ,{headers:{token}} )
           if (response.data.success) {
            toast.success(response.data.message)
            await fetchList();
           } else{
            toast.error(response.data.message)
           }
         } catch (error) {
           console.log(error)
           toast.error(error.message)
           
         }
     }

    useEffect(()=>{
      fetchList()
    },[token])

  return (
    <>
    <p className='mb-2'>All Products</p>

    <div className='flex flex-col gap-2'>
            {/* List Table Title */}
            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm'>
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b className='text-right'>Price</b>
              <b>Visible</b>
              <b className='text-center'>Action</b>
            </div>
                
                {/*   Product List */}

                {
                  list.map((item, index) => (
                     <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-3 py-2 px-4 border text-sm hover:bg-gray-50' key={index}>
                       <img className='w-12' src={item.image[0]} alt="" />
                       <p>{item.name}</p>
                       <p className='col-span-1 md:col-span-1'>{item.category}</p>
                       <p className='text-right'>{currency}{item.price}</p>
                       <input type="checkbox" checked={item.isVisible} onChange={async (e) => {
                         try {
                           const response = await fetch(backendUrl + '/api/product/update', {
                             method: 'POST',
                             headers: {
                               'Content-Type': 'application/json',
                               'Authorization': `Bearer ${token}`
                             },
                             body: JSON.stringify({ id: item._id, isVisible: e.target.checked })
                           });
                           if (!response.ok) {
                             const errorData = await response.json();
                             toast.error(errorData.message || 'Failed to update visibility');
                             return;
                           }
                           const data = await response.json();
                           if (data.success) {
                             toast.success('Product visibility updated');
                             await fetchList();
                           } else {
                             toast.error(data.message);
                           }
                         } catch (error) {
                           toast.error('Failed to update visibility');
                         }
                       }} />
                       <p className='text-center cursor-pointer text-lg text-red-600 hover:text-red-800' onClick={()=>removeProduct(item._id)}>X</p>
                     </div>
                  ))
                }
    </div>
    </>
  )
}

export default List
