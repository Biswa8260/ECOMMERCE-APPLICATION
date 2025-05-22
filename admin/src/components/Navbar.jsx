import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between bg-white p-0 h-20 shadow-md">
        <img src={assets.logo} alt="" className="h-35 w-[max(8%,90px)]  " />
        <button onClick={()=>setToken('')}className="bg-blue-500 text-white px-4 py-2 sm:px-7 sm:py-2 rounded-full hover:bg-blue-600">Logout</button>
    </div>
  )
}

export default Navbar
