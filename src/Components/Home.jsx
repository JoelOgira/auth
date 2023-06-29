import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center pt-20">
            <div className="bg-blue-950 rounded-md shadow p-4 text-white w-full lg:w-1/2">
                <h1 className="text-2xl font-bold pb-3">Home</h1>
                <h2 className="text-xl pb-3">You are logged in</h2>
                
                <div className="flex flex-col space-y-6">
                    <Link to='/editor' className="underline">
                        Go to the Editors page
                    </Link>
                    <Link to='/admin' className="underline">
                        Go to the Admin page
                    </Link>
                    <Link to='/lounge' className="underline">
                        Go to the Lounge page
                    </Link>
                    <Link to='/linkpage' className="underline">
                        Go to the Link page
                    </Link>
                </div>

                <button
                    className={"my-5 border rounded w-full bg-blue-200 hover:bg-white text-blue-950 py-3 font-semibold"}
                >
                    Sign Out
                </button>

            </div>
        </div>
    )
}

export default Home;