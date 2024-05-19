import { Layout, theme } from "antd";
const { Header } = Layout;

function HeaderComponent() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Header className="header"/>
    </>
  );
}

export default HeaderComponent;
