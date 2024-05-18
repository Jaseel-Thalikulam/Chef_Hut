import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/LoginPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import LayoutComponent from "./components/layout/LayoutComponent";
import './styles/app.css'

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "orange",
          },
        }}
      >
        <StyleProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
             
              
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={
              <LayoutComponent>
                  
                <Profile />
              </LayoutComponent>
              
              } />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/error" element={<Error />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </StyleProvider>
      </ConfigProvider>
    </>
  );
}

export default App;
