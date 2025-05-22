import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler=(event) =>{
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className="text-3xl font-bold px-4 py-2 rounded-xl shadow-md animate-bounce-color">
  Join Us Now Via Email and get 20% off on your first purchase!
</p>

{/* <p className="text-xl font-semibold text-green-500 mt-3 animate-pulse drop-shadow-md">
  Login Now
</p> */}
       

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 boder pl-3 '>
        
      <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 px-4 py-2 rounded-xl border border-gray-300 text-green-900 placeholder:text-green-500 bg-gradient-to-r from-white via-green-50 to-white focus:from-green-100 focus:to-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 shadow-sm" required />
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-700 text-white text-sm px-8 py-2 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 hover:scale-105 transition-all duration-300 ease-in-out animate-pulse">
                        Join Now</button>
      </form>
      
    </div>
  )
}

export default NewsLetterBox
