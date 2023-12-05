import { Flex, Layout, Space } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Wallet from "./Wallet";

const { Sider, Content } = Layout;

import { MedicineBoxOutlined } from "@ant-design/icons";

import backIcn from "../../assets/icons/back.svg"

const BackIcon = () => (
  <img
    src={backIcn}
    style={{
      width: "24px",
      height: "24px",
      cursor: "pointer",
      borderRadius: "50%",
      marginLeft: "10px",
    }}
    onClick={() => {
      window.history.back();
    }}
  />
)


const AppLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      <Sider breakpoint="lg" collapsedWidth="0" style={{ padding: "5px" }}>
        <Space
          style={{
            display: "flex",
            color: "white",
          }}
        >
          <BackIcon />
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
          <Wallet />
          <Outlet />
        </Flex>
      </Content>
    </Layout>
  );
};

export default AppLayout;
