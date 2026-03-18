import { useState } from 'react'
import plantLight from '../assets/plantLight.png'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from './ConfirmModal'

export default function Navbar() {
    const nav = useNavigate()
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    return (
        <div className="flex flex-row bg-dark-bottle-green items-center">
            <div>
                <img src={plantLight} alt="plant-icon" className="w-20 h-20 p-2"
                     onClick={() => nav('/homepage')}/>
            </div>
            <div className="flex flex-row gap-[60px] flex-1 justify-start
                            mr-[60px] text-black text-xl ml-[40px]">
                <p className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl">Datasets</p>
                <p className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl">Graphs</p>
                <p className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl">Reports</p>
            </div>
            <button className='p-3 bg-white text-xl rounded-xl m-3 hover:!bg-medium-green'
            onClick={() => setShowLogoutModal(true)}>Logout</button>

            {showLogoutModal && <ConfirmModal showLogoutModal={showLogoutModal}
                            setShowLogoutModal={setShowLogoutModal}/>}
        </div>

    )
}