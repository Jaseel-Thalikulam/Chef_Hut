
import { Layout,  theme } from "antd";
const { Header } = Layout;

function HeaderComponent() {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
      <>
       <Header style={{ padding: 0, background: 'orange' }} />
      </>
  )
}

export default HeaderComponent
