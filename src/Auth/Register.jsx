/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [ user, setUser ] = useState('');
    const [ validName, setValidName ] = useState(false);
    const [ userFocus, setUserFocus ] = useState(false);

    const [ pwd, setPwd ] = useState('');
    const [ validPwd, setValidPwd ] = useState(false);
    const [ pwdFocus, setPwdFocus ] = useState(false);

    const [ matchPwd, setMatchPwd ] = useState('');
    const [ validMatch, setValidMatch ] = useState(false);
    const [ matchFocus, setMatchFocus ] = useState(false);

    const [ errMsg, setErrMsg ] = useState('');
    const [ success, setSuccess ] = useState('');

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const REGISTER_URL = '/register';

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result)
    }, [ user ]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result)
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [ pwd, matchPwd ]);

    useEffect(() => {
        setErrMsg('');
    }, [ user, pwd, matchPwd ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const res = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(res.data);
            console.log(res.accessToken);
            console.log(JSON.stringify(res));

            setUser('');
            setPwd('');
            setMatchPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="flex flex-col justify-center items-center pt-20">
            <div className="bg-blue-950 shadow-lg p-4 text-white w-full lg:w-1/2">
                {success ?
                    <div>
                        <p className="py-2">Success</p>
                        <Link path='/login' className="underline">
                            Log In
                        </Link>
                    </div>
                    : <>
                        <p ref={errRef} aria-live="assertive" className={`(${errMsg} block ?  absolute left-[-9999px] ) border text-center py-2 font-semibold text-red-600 rounded bg-white mb-3`}>{errMsg}</p>
                        <h1 className="text-2xl font-bold pb-3">Register</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <div className="mb-5">
                                <label className="flex" htmlFor="Username">
                                    Username:
                                    <span className={validName ? "px-1 pt-[0.375rem]" : "absolute left-[-9999px]"}>
                                        <FaCheck className="text-green-500" />
                                    </span>
                                    <span className={validName || !user ? "absolute left-[-9999px]" : "px-1 pt-[0.375rem]"}>
                                        <FaTimes className="text-red-500" />
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded p-2 text-black focus: outline-none"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    required
                                    aria-invalid={validName ? false : true}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id="uidnote" className={userFocus && user && !validName ? 'text-sm bg-black rounded px-2 py-1 my-1' : 'absolute left-[-99999px]'}>
                                    <span><FaInfoCircle className="inline pb-[0.125rem]" /></span> 4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>

                            <div className="mb-5">
                                <label className="flex" htmlFor="Password">
                                    Password:
                                    <span className={validPwd ? "px-1 pt-[0.375rem]" : "absolute left-[-9999px]"}>
                                        <FaCheck className="text-green-500" />
                                    </span>
                                    <span className={validPwd || !pwd ? "absolute left-[-9999px]" : "px-1 pt-[0.375rem]"}>
                                        <FaTimes className="text-red-500" />
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded p-2 text-black focus:outline-none"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    required
                                    aria-invalid={validPwd ? false : true}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? 'text-sm bg-black rounded px-2 py-1 my-1' : 'absolute left-[-99999px]'}>
                                    <span><FaInfoCircle className="inline pb-[0.125rem]" /></span> 8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>.
                                </p>
                            </div>

                            <div className="mb-5">
                                <label className="flex" htmlFor="Confirm_Password">
                                    Confirm_Password:
                                    <span className={validMatch && matchPwd ? "px-1 pt-[0.375rem]" : "absolute left-[-9999px]"}>
                                        <FaCheck className="text-green-500" />
                                    </span>
                                    <span className={validMatch || !matchPwd ? "absolute left-[-9999px]" : "px-1 pt-[0.375rem]"}>
                                        <FaTimes className="text-red-500" />
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    className="w-full rounded p-2 text-black focus:outline-none"
                                    id="Confirm_Password"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? false : true}
                                    aria-describedby="matchnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="matchnote" className={matchFocus && !validMatch ? 'text-sm bg-black rounded px-2 py-1 my-1' : 'absolute left-[-99999px]'}>
                                    <span><FaInfoCircle className="inline pb-[0.125rem]" /></span> Must match the first password input field
                                </p>
                            </div>

                            <button
                                className="mb-5 border rounded bg-white text-blue-950 py-3 font-semibold my-3"
                                disabled={!validName || !validPwd || !validMatch ? true : false}
                            >
                                Sign In
                            </button>
                        </form>

                        <div>
                            <p className="py-2">Already Registered?</p>
                            <Link path='/signin' className="underline">
                                Sign In
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Register;