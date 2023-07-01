import { Routes, Route } from "react-router-dom";
import RequireAuth from "./Auth/RequireAuth";
import ClockApp from "./timer/ClockApp";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import LinkPage from "./Components/LinkPage";
import Unauthorized from "./Components/Unauthorized";
import Missing from "./Components/Missing";
import Editor from "./Components/Editor";
import Admin from "./Components/Admin";
import Lounge from "./Components/Lounge";

const App = () => {
  const ROLES = {
    "user": 2001,
    "Editor": 1984,
    "Admin": 5150
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/linkpage" element={<LinkPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/clock" element={<ClockApp />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={[ ROLES.user ]} />} >
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ ROLES.Admin ]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ ROLES.Editor ]} />}>
          <Route path="/editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ ROLES.Editor, ROLES.Admin ]} />}>
          <Route path="/lounge" element={<Lounge />} />
        </Route>
        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes >
  )
}

export default App;