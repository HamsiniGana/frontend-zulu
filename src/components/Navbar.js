import plantLight from '../assets/plantLight.png'
import Homepage from './Homepage'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
    const nav = useNavigate()
    return (
        <div className="flex flex-row bg-dark-bottle-green items-center">
            <div>
                {/* change the ENDPOINT!!!!!!!!!!!!!! */}
                <img src={plantLight} alt="plant-icon" className="w-20 h-20 p-2"
                     onClick={() => nav('/')}/>
            </div>
            <div className="flex flex-row gap-[60px] flex-1 justify-end
                            mr-[60px] text-black text-xl">
                <p className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl">Datasets</p>
                <p className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl">Graphs</p>
                <p className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl">Reports</p>
            </div>
        </div>
    )
}