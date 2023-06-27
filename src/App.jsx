import { Routes, Route } from "react-router-dom";
import ClockApp from "./timer/ClockApp";
import Register from "./Auth/Register";
import Login from "./Auth/Login";

const App = () => {
  return (
    <div className='min-h-[100dvh] bg-blue-700'>
      <div className="px-5 container mx-auto md:w-1/2">
        <Routes>
          <Route path="/clock" element={<ClockApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;