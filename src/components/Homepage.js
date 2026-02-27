import rain from '../assets/rain.png'
import sappling from '../assets/sappling.png'
import Navbar from "./Navbar"
export default function Homepage () {
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="bg-light-green min-h-screen flex flex-col">

        <div className="flex flex-row gap-[20vw] bg-gradient-to-r from-medium-green 
                        via-light-green to-medium-green m-5 p-5 items-center justify-center
                        rounded-3xl shadow-2xl shadow-dark-bottle-green
                        hover:scale-[1.01]">
          <div className='flex flex-col gap-2 items-center'>
            <img src={rain} alt='rain-icon' className='w-[50px] h-[50px]'/>
            <img src={sappling} alt='sappling-icon' className='w-[40px] h-[40px]'/>
          </div>

          <div className="flex flex-col flex-1">
            <h1 className="text-dark-bottle-green font-bold text-2xl pb-5">Data</h1>
            <p className="text-lg pb-5">Upload or use existing datasets to analyse plant data in relation to weather data.</p>
            <div className="flex flex-row justify-end mr-3">
              <button  className="hover:bg-white hover:text-black py-2 px-3 rounded-xl w-[150px] hover:border hover:border-solid hover:border-black
              bg-dark-bottle-green text-white">Get started</button>
            </div>
          </div>
        </div>

        <div>
          
        </div>
      </div>

    </div>
  )
}