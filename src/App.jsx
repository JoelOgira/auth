import { Routes, Route } from "react-router-dom";
import ClockApp from "./timer/ClockApp";

const App = () => {
  return (
    <div className='min-h-[100dvh] bg-blue-700'>
      <div className="px-5 container mx-auto md:w-1/2">
        <Routes>
          <Route path="/clock" element={<ClockApp />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;