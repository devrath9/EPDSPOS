import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

    const navigate = useNavigate()

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-center">
      <p className="text-3xl md:text-4xl text-gray-700 mb-4">
        This resource does not exist.
      </p>
      <button
        onClick={() => navigate('/',{replace:true})}         //replace true does not allow to go back to that 404 page
        className="px-5 py-2 bg-[#2191c0] text-white rounded hover:bg-green-400 transition"
      >
        Go back to homepage
      </button>
    </div>
  )
}

export default NotFound
