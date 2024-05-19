import { Layout } from "antd";
import Header from "./HeaderComponent";
import SideBar from "./SideBarComponent";
import ContentWrap from "./ContentWrap";
import '../../styles/layout.css'
import { Outlet } from "react-router-dom";
function LayoutComponent() {
  return (
    <Layout id="layout">
      <SideBar  />
      <Layout>

        <Header  />

        <ContentWrap>
          <Outlet/>
        </ContentWrap>

        {/* <Footer /> */}

      </Layout>
    </Layout>
  );
}

export default LayoutComponent;
