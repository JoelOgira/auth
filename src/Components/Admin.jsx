import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div className="flex flex-col justify-center items-center pt-20">
            <div className="bg-blue-950 rounded-md shadow p-4 text-white w-full lg:w-1/2">
                <h1 className="text-3xl font-bold pb-6">Admins Page</h1>
                <p className="py-3">You have been assigned an Admin role</p>
                <Link to='/' className="underline">
                    Home
                </Link>
            </div>e
        </div>
    )
}

export default Admin;