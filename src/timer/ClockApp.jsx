import { useState, useRef } from "react"

const ClockApp = () => {
    const [ randomInput, setRandomInput ] = useState('');
    const timerId = useRef();
    const [ seconds, setSeconds ] = useState(0);
    const renders = useRef(0);

    const handleChange = e => {
        setRandomInput(e.target.value);
        renders.current++;
    }

    const startTimer = () => {
        timerId.current = setInterval(() => {
            renders.current++;
            setSeconds(prev => prev + 1);
        }, 1000)
    }

    const stopTimer = () =>{
        clearInterval(timerId.current);
        // timerId.current = 0;
    }

    const resetTimer = () => {
        stopTimer();
        if (seconds) {
            renders.current++;
            setSeconds(0);
        }
    }

    return (
        <div className="flex flex-col space-y-5 pt-20 lg:w-2/3">
            <input
                type="text"
                className="p-2 rounded w-full focus:outline-transparent"
                placeholder="Random Input"
                value={randomInput}
                onChange={handleChange}
            />
            <div className="flex flex-col space-y-3 text-white text-lg">
                <p>Renders: {renders.current}</p>
                <div className="flex flex-row space-x-5 justify-between text-.x text-blue-600">
                    <button onClick={startTimer} className="border rounded px-6 py-3 bg-white">Start</button>
                    <button onClick={stopTimer} className="border rounded px-6 py-3 bg-white">Stop</button>
                    <button onClick={resetTimer} className="border rounded px-6 py-3 bg-white">Reset</button>
                </div>
                <p>Seconds: {seconds}</p>
                <p>{randomInput}</p>
            </div>
        </div>
    )
}

export default ClockApp;