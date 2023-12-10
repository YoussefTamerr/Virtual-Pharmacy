import { useState } from "react";
import { Flex, Layout, Space } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Wallet from "./Wallet";

const { Sider, Content, Header } = Layout;

import { MenuOutlined } from "@ant-design/icons";

import AppHeader from "./AppHeader";

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "0 20px",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Space
          style={{
            display: "flex",
            color: "white",
          }}
        >
          <MenuOutlined
            style={{
              fontSize: "20px",
              cursor: "pointer",
              display: "block",
            }}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
          <h1>Pharmacy</h1>
        </Space>
        <Space>
          <AppHeader />
          <Wallet />
        </Space>
      </Header>
      <Layout style={{ minHeight: "100vh", background: "white" }}>
        <Sider
          breakpoint="lg"
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
          trigger={null}
          width={250}
        >
          <Navbar />
        </Sider>
        <Content>
          <Flex
            vertical
            justify="start"
            gap={10}
            align="center"
            style={{ height: "75vh" }}
          >
            <Outlet />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
