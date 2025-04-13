import { useLocation, useNavigate } from "react-router-dom"
import BackIcon from "../assets/Svg/BackIcon"
import DotsIcon from "../assets/Svg/DotsIcon"

const NavComponent = () => {
    const location = useLocation()
    const { pathname } = location
    const navigate = useNavigate()
    return (
        <nav className="bg-[#F8F8F8BF] grid grid-cols-3 shadow-md p-3 ">
            {pathname.includes('/result') ? <button onClick={() => navigate('/')} ><BackIcon /></button> : <div></div>}
            <h1 className="text-xl text-center text-[#414343] font-medium">
                Sentence Construction
            </h1>
            <div className="flex items-center justify-end">

                <DotsIcon />
            </div>
        </nav>
    )
}

export default NavComponent