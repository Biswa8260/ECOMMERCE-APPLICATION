import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, setToken, navigate, backendUrl, logout } = useContext(ShopContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentState === 'Login') {
      if (!email || !password) {
        alert('Please fill up the required fields first')
        return
      }
      try {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password,
        })
        if (response.data.success) {
          console.log('Login successful, token:', response.data.token);
          setToken(response.data.token);
          navigate('/');
          import('react-toastify').then(({ toast }) => {
            toast.success('User logged in successfully');
          });
        } else {
          alert(response.data.message || 'Login failed');
        }
      } catch (error) {
        alert(error.response?.data?.message || error.message || 'Login error')
      }
    } else {
      if (!name || !email || !password) {
        alert('Please fill up the required fields first')
        return
      }
      try {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password,
        })
        if (response.data.success) {
          alert('Sign up successful! Please log in to your account.')
          setCurrentState('Login')
          setName('')
          setEmail('')
          setPassword('')
        } else {
          alert(response.data.message || 'Sign up failed')
        }
      } catch (error) {
        alert(error.response?.data?.message || error.message || 'Sign up error')
      }
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  return (
    <>
      {token ? (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto text-gray-800 space-y-4 mt-10">
          <p className="prata-regular text-3xl mb-4">You are logged in</p>
          <button
            onClick={() => logout()}
            className="bg-red-600 text-white font-light px-8 py-2 rounded"
          >
            Log Out
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto text-gray-800 space-y-4"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular  text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8  bg-gray-800" />
          </div>

          {currentState === 'Login' ? (
            ''
          ) : (
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-800"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot Your Password?</p>
            {currentState === 'Login' ? (
              <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
                Create Account
              </p>
            ) : (
              <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
                Login Here
              </p>
            )}
          </div>
          <button className="bg-black text-white font-light px-8 py-2 mt-4" type="submit">
            {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      )}
    </>
  )
}

export default Login
