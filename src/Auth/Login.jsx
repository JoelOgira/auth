import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthProvider";
import axios from "../api/axios";

const Login = () => {
    const { setAuth } = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [ user, setUser ] = useState('');
    const [ pwd, setPwd ] = useState('');
    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('')
    }, [ user, pwd ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login',
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing username or password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg('Login Failed!');
            }
            errRef.current.focus();
        }

    }

    return (
        <div className="flex flex-col justify-center items-center pt-20">
            <div className="bg-blue-950 rounded-md shadow p-4 text-white w-full lg:w-1/2">
                {success ?
                    <div>
                        <p className="py-2">You are Logged in!</p>
                        <Link path='/login' className="underline">
                            Go to Home
                        </Link>
                    </div>
                    :
                    <>
                        <p
                            ref={errRef}
                            aria-live="assertive"
                            className={errMsg ? "border-none text-center py-2 font-semibold text-red-600 rounded bg-red-200 mb-3" : "absolute left-[-9999px]"}
                        >
                            {errMsg}
                        </p>
                        <h1 className="text-2xl font-bold pb-3">Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label className="flex" htmlFor="Username">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded p-2 text-black focus: outline-none"
                                    id="username"
                                    ref={userRef}
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-5">
                                <label className="flex" htmlFor="Password">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded p-2 text-black focus:outline-none"
                                    id="password"
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                className={"mb-5 border rounded w-full bg-blue-200 hover:bg-white text-blue-950 py-3 font-semibold my-3"}
                            >
                                Sign In
                            </button>

                        </form>

                        <div>
                            <p className="py-2">Don&apos;t have an Account?</p>
                            <Link to='/register' className="underline">
                                Sign Up
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Login