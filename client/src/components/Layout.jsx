import { Flex } from "antd";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex
      style={{ minHeight: "100vh" }}
      justify="center"
      align="center"
      vertical
    >
      <Outlet />
    </Flex>
  );
};

export default Layout;
