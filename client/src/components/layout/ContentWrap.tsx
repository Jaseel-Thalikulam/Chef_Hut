
import { Layout } from "antd";
import { IContentWrapProps } from "../../interfaces/IContentwrapProps";

function ContentWrap({children}:IContentWrapProps) {
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
