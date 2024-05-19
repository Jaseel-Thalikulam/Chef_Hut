
import { Layout } from "antd";

function ContentWrap({children}:any) {
    const { Content } = Layout;
  
  return (
      <>
          <Content className="content--wrapper">
           
            {children}
              
         
        </Content>
      </>
  )
}

export default ContentWrap
