import plant from '../assets/plant.png'
import leftArrow from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SignUpPage () {
    const nav = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // useEffect(()=> {
    //     if (username !== '' && email !== '' && password !== ''&& confirmPassword !== '' && fullName !== '') {
    //         send_sign_up_req()
    //     }

    // }, [username, email, password, fullName, confirmPassword])

    const send_sign_up_req = async() => {
        const res = await axios({
            method: 'post',
            url: 'https://sengzulu.ashywater-d646a6d4.australiaeast.azurecontainerapps.io/sign-up/',
            data: {
                username: username,
                plain_password: password,
                email: email,
                confirm_plain_password: confirmPassword,
                full_name: fullName,
            }
        });
        console.log(res)
    }

    return (
         <div className="flex flex-row w-screen">

            <div className="flex flex-col bg-medium-green min-h-screen w-2/3">
            <div className="flex justify-start">
                    <img src={leftArrow} alt='arrow-icon' className='size-10 m-4' onClick={() => nav('/')}/>
            </div>
                <div className="flex h-screen flex-col flex-1 items-center justify-center mb-5 px-6 mb-[100px] lg:px-8 mt-0">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">Create your new account</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label for="username" className="block text-lg font-medium text-gray-900">Username:</label>
                                <div className="mt-2">
                                <input id="username"
                                type="text"
                                name="username"
                                required autoComplete="username"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
                                outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400
                                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                onChange={(e)=> setUsername(e.target.value)}/>
                                </div>
                                
                            </div>
                            <div>
                                <label for="fullName" className="block text-lg font-medium text-gray-900">Full name:</label>
                                <div className="mt-2">
                                <input id="fullName"
                                type="text"
                                name="fullName"
                                required autoComplete="fullName"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900
                                outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400
                                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                onChange={(e)=> setFullName(e.target.value)}/>
                                </div>
                                
                            </div>
                            <div>
                                <label for="email" className="block text-lg font-medium text-gray-900">Email address:</label>
                                <div className="mt-2">
                                <input id="email" 
                                type="email" 
                                name="email" 
                                required autoComplete="email" 
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                                text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                                placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                                focus:outline-indigo-600 sm:text-sm/6" 
                                onChange={(e)=> {setEmail(e.target.value)}}/>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                <label for="password" className="block text-lg font-medium text-gray-900">Password:</label>
                                </div>
                                <div className="mt-2">
                                <input id="password" 
                                type="password" 
                                name="password" 
                                required autoComplete="current-password" 
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                                text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                                placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                                focus:outline-indigo-600 sm:text-sm/6" 
                                onChange={(e)=> {setPassword(e.target.value)}}/>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                <label for="confirm-password" className="block text-lg font-medium text-gray-900">Confirm password:</label>
                                </div>
                                <div className="mt-2">
                                <input id="confirm-password" 
                                type="password" 
                                name="confirm-password" 
                                required autoComplete="confirm-password" 
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                                text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                                placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2
                                focus:outline-indigo-600 sm:text-sm/6" 
                                onChange={(e)=> {setConfirmPassword(e.target.value)}}/>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm/6
                                        font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={()=> send_sign_up_req()}
                                        >Sign up
                                </button>
                            </div>
                            </form>

                        <p className="mt-10 text-center text-md text-gray-500">
                        Already have an account?
                        <a href="/login" className="font-semibold text-dark-green hover:underline hover: decoration-2"> Login</a>
                        </p>
                    </div>
                    </div>

            </div>
            <div className="flex bg-light-green items-center justify-center w-1/3">
                <img src={plant} alt="plant-icon" className='size-60'/>
            </div>
    </div>
    )
}