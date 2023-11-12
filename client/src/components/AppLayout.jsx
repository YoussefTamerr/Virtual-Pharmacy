import { Flex, Layout, Space } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const { Sider, Content } = Layout;

import { MedicineBoxOutlined } from "@ant-design/icons";

const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ padding: "5px" }}>
        <Space
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <MedicineBoxOutlined />
          <h1>Pharmacy</h1>
        </Space>
        <Navbar />
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
