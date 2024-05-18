import { Layout } from "antd";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import SideBar from "./SideBarComponent";
import ContentWrap from "./ContentWrap";
import '../../styles/layout.css'
function LayoutComponent({ children }: any) {
  return (
    <Layout id="layout">
      <SideBar />
      <Layout>

        <Header />

        <ContentWrap>
          {children}
        </ContentWrap>

        <Footer />

      </Layout>
    </Layout>
  );
}

export default LayoutComponent;
