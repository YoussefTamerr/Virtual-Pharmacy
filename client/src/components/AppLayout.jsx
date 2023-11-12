import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { createElement } from "react";

const { Sider, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={["4"]}
          items={[
            UserOutlined,
            VideoCameraOutlined,
            UploadOutlined,
            UserOutlined,
          ].map((icon, index) => ({
            key: String(index + 1),
            icon: createElement(icon),
            label: `nav ${index + 1}`,
          }))}
          style={{ border: "none" }}
        />
      </Sider>
      <Content>
        <Flex
          vertical
          justify="space-evenly"
          align="center"
          style={{ minHeight: "100vh" }}
        >
          <Outlet />
        </Flex>
      </Content>
    </Layout>
  );
};

export default AppLayout;
