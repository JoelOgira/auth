
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className='min-h-[100dvh] bg-blue-700'>
            <div className="px-5 container mx-auto md:w-1/2">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;