
import { Layout, theme } from "antd";

function ContentWrap({children}:any) {
    const { Content } = Layout;
    // const {
    //     token: { colorBgContainer, borderRadiusLG },
    //   } = theme.useToken();
  return (
      <>
          <Content style={{padding:20}} >
           
            {children}
              
         
        </Content>
      </>
  )
}

export default ContentWrap
