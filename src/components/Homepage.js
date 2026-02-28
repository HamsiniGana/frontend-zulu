import rain from '../assets/rain.png'
import sappling from '../assets/sappling.png'
import graph from '../assets/graph.png'
import Navbar from "./Navbar"
import report from '../assets/report.png'
export default function Homepage () {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="bg-light-green min-h-screen flex flex-col">
        <div className="flex flex-row gap-[20vw] bg-gradient-to-r from-medium-green
                        via-light-green to-medium-green mx-5 p-5 items-center justify-center
                        rounded-3xl shadow-2xl shadow-dark-bottle-green
                        hover:scale-[1.01] h-[40vh] mt-[5vh]">
          <div className='flex flex-col gap-2 h-full items-center justify-center mb-2'>
            <img src={rain} alt='rain-icon' className='w-[80px] h-[80px]'/>
            <img src={sappling} alt='sappling-icon' className='w-[70px] h-[70px]'/>
          </div>

          <div className="flex flex-col flex-1 h-full">
            <div className="flex flex-col flex-1 justify-center">
              <h1 className="text-dark-bottle-green font-bold text-2xl pb-5">Data</h1>
              <p className="text-xl">Upload or use existing datasets to analyse plant data in relation to weather data.</p>
            </div>
            <div className="flex flex-row justify-end mr-1">
                <button  className="hover:bg-white hover:text-black py-2 px-3 rounded-xl w-[150px] hover:border hover:border-solid hover:border-black
                bg-dark-bottle-green text-white text-xl">Get started</button>
            </div>
          </div>
        </div>

        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col bg-gradient-to-r from-medium-green
                        via-light-green to-medium-green m-5 p-5
                        rounded-3xl shadow-2xl shadow-dark-bottle-green
                        hover:scale-[1.01] w-[49vw]  h-[40vh]'>
          <div className="flex flex-row justify-start w-full">
            <h1 className="text-dark-bottle-green font-bold text-2xl pb-5">Graphs</h1>
          </div>

          <div className='flex flex-row gap-5 items-center flex-1 '>
            {/* <div className='flex flex-row items-center h-full  border border-solid border-black'>   */}
              <img src={graph} alt='graph-icon' className='w-[80px] h-[80px] '/>
              <p className="text-xl pb-5 text-center mt-5">View data trends.</p>
            {/* </div> */}
          </div>
          <div className="flex flex-row justify-end mr-1">
              <button  className="hover:bg-white hover:text-black py-2 px-3 rounded-xl w-[150px] hover:border hover:border-solid hover:border-black
              bg-dark-bottle-green text-white text-xl">Get started</button>
            </div>
        </div>
        <div className='flex flex-col bg-gradient-to-r from-medium-green
                        via-light-green to-medium-green m-5 p-5
                        rounded-3xl shadow-2xl shadow-dark-bottle-green
                        hover:scale-[1.01] w-[49vw]  h-[40vh]'>
          <div className="flex flex-row justify-start w-full">
            <h1 className="text-dark-bottle-green font-bold text-2xl pb-5">Reports</h1>
          </div>

          <div className='flex flex-row gap-5 items-center flex-1'>
            <img src={report} alt='graph-icon' className='w-[80px] h-[80px]'/>
            <p className="text-xl pb-5 mt-5">Harvest final intelligence.</p>
          </div>
          <div className="flex flex-row justify-end mr-1">
              <button  className="hover:bg-white hover:text-black py-2 px-3 rounded-xl w-[150px] hover:border hover:border-solid hover:border-black
              bg-dark-bottle-green text-white text-xl">Get started</button>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}