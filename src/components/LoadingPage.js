import { useEffect } from 'react'
import plant from '../assets/plant.png'
import {useNavigate } from 'react-router-dom'

export default function LoadingPage() {
  const nav = useNavigate()
  useEffect(() => {
    setInterval(() => nav('/homepage'), 3000)
  }, [])
    return (
    <div className="bg-medium-green min-h-screen flex">
      <div className="bg-light-green w-full m-[50px] rounded-3xl flex flex-col items-center justify-center">
          <img src={plant} alt="plant-icon" className='size-40 mb-5'/>
          <div className='flex flex-row'>
            <p className='text-4xl'>Loading </p>
            <p className='text-4xl dot-one'>.</p>
            <p className='text-4xl dot-two'>.</p>
            <p className='text-4xl dot-three'>.</p>
            <p className='text-4xl dot-four'>.</p>
          </div>
      </div>
    </div>
    )
}