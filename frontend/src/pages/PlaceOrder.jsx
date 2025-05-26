import React ,{ useState, useContext}from 'react'
import Title   from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const PlaceOrder = () => {

  const [method ,setMethod]= useState('cod');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  

  const {navigate, validateDeliveryInfo, setDeliveryInfo} = useContext(ShopContext);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Set delivery info in context
    setDeliveryInfo({
      address: street,
      city: city,
      state: state,
      zip: zipCode,
      country: country,
      phone: phone,
      firstName: firstName,
      lastName: lastName,
      email: email
    });

    // Validate delivery info using context function
    if (!validateDeliveryInfo()) {
      return;
    }
    navigate('./orders');
  };

  return (
    
    <form className='flex flex-wrap gap-8 pt-5 sm:pt-14 min-h-[80vh] border-top'>


      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email address' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' type="text" value={street} onChange={(e) => setStreet(e.target.value)} />

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State' type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </div>

        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Zip Code' type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone' type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      {/* RIGHT SIDE */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-8'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* ------------payment method */}
          <div className='flex gap-4 flex-col lg:flex-row '>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 rounded cursor-pointer w-full lg:w-auto'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ?  'bg-green-400' : ''} `}> </p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>

            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ?  'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>

            <div  onClick={()=>setMethod('cod')} className='flex items-center gap-4 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5  border rounded-full ${method === 'cod' ?  'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>


          <div className='w-full text-end mt-8'>
            <button  onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>

          </div>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder
