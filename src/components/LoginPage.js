import plant from '../assets/plant.png'
import leftArrow from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router-dom'
export default function LoginPage () {
    const nav = useNavigate()
    return (
        <div className="flex flex-row w-screen">
            <div className="flex flex-col bg-light-green items-center justify-center w-1/3">
                <div className="flex flex-row justify-start items-start w-full ">
                    <img src={leftArrow} alt="arrow-icon" className='m-4 size-10' onClick={() => nav('/')}/>
                </div>
                <div className="flex flex-col flex-1 justify-center p-5 mb-5">
                    <img src={plant} alt="plant-icon" className='size-60'/>
                </div>

            </div>
            <div className="bg-medium-green min-h-screen w-2/3">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login to your account</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address:</label>
                                <div className="mt-2">
                                <input id="email" type="email" name="email" required autocomplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm/6 font-medium text-gray-900">Password:</label>
                                </div>
                                <div className="mt-2">
                                <input id="password" type="password" name="password" required autocomplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm/6
                                        font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
                            </div>
                            </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Don't have an account?
                        <a className="font-semibold text-dark-green hover:underline hover: decoration-2"> Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}