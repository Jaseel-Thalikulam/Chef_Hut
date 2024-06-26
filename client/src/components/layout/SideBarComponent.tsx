import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { setUserUnauthenticated } from "../../redux/userSlice";
import { deleteCookie } from "../../api/user";
function SideBarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignOut = async (key: string) => {
    if (key !== "SignOut") return;
    await deleteCookie();
    dispatch(setUserUnauthenticated());
    navigate("/");
  };

  const items = [
    {
      label: "Profile",
      path: "/profile",
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: "Sign Out",
      key: "SignOut",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <>
      <Sider breakpoint="lg" collapsedWidth="0" className="side--bar--content">
        <div className="logo">
          <Logo />
        </div>
        <Menu
          onClick={({ key }) => SignOut(key)}
          className="side--bar--content menu"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["profile"]}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                item.label
              )}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
}

export default SideBarComponent;
