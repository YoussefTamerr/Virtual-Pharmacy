import { Flex } from "antd";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      style={{ minHeight: "100vh" }}
    >
      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
