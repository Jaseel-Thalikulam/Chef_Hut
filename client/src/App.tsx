import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/error" element={<Error />} /> 
          <Route path="/*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
