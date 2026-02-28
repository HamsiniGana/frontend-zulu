import plant from '../assets/plant.png'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const nav = useNavigate()
    return (
        <div className="bg-medium-green min-h-screen flex">
      <div className="bg-light-green w-full m-[50px] rounded-3xl flex flex-col items-center ">
        <div className="flex flex-row justify-end my-5 mr-[50px] mb-[160px] gap-5 w-full ">
            <button class="bg-medium-green hover:bg-black hover:text-white text-black text-xl font-bold py-5 px-[40px] rounded-full"
                  onClick={() => nav('/loadingPage')}>

            Homepage
          </button>
          <button class="bg-medium-green hover:bg-black hover:text-white text-black text-xl font-bold py-5 px-[40px] rounded-full"
                  onClick={() => nav('/login')}>
            Login
          </button>
          <button class="bg-dark-green hover:bg-black text-white font-bold text-xl py-5 px-[40px] rounded-full"
                  onClick={() => nav('/sign-up')}>
            Sign up
          </button>
        </div>
        <h1 className='text-[60px]'>
          Welcome to Zulu!
          </h1>
          <p className='text-[30px]'>
            Aligning your garden’s needs with the day’s forecast
          </p>
          <img src={plant} alt="plant-icon" className='size-60 mt-[80px] mt-[70px]'/>
      </div>
    </div>
    )
}