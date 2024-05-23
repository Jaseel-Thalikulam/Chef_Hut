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
import "./styles/app.css";
import { SnackbarProvider } from "notistack";
import PublicRoutes from "./auth/PublicRoutes";
import PrivateRoutes from "./auth/PrivateRoutes";
function App() {
  return (
    <>
      <SnackbarProvider
        autoHideDuration={2000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        maxSnack={2}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#fd7014",
            },
          }}
        >
          <StyleProvider>
            <BrowserRouter>
              <Routes>
               
                <Route path="/" element={
                  <PublicRoutes>
                  <Login />
                  </PublicRoutes>
                } />
                

                  <Route path="/home" element={<Home />} />
                  <Route path="/error" element={<Error />} />
                  <Route path="/*" element={<NotFound />} />

                <Route element={
                  <PrivateRoutes>
                  <LayoutComponent />
                  </PrivateRoutes>
                }>
                  <Route path="profile" index element={<Profile />} />
                  <Route path="edit-profile" element={<EditProfile />} />
                </Route>

              </Routes>
            </BrowserRouter>
          </StyleProvider>
        </ConfigProvider>
      </SnackbarProvider>
    </>
  );
}

export default App;
